package dev.mcreator.aicopilot;

import net.mcreator.plugin.JavaPlugin;
import net.mcreator.plugin.Plugin;
import net.mcreator.plugin.events.workspace.MCreatorLoadedEvent;
import net.mcreator.ui.action.BasicAction;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.swing.JOptionPane;
import javax.swing.JMenu;
import javax.swing.SwingUtilities;
import java.awt.Desktop;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

/**
 * Thin native bridge from MCreator to the local AI Copilot companion.
 * The companion remains a separate local process; this plugin never embeds API keys.
 */
public final class MCreatorAICopilotPlugin extends JavaPlugin {
    private static final Logger LOG = LogManager.getLogger("MCreator AI Copilot");
    private static final URI COMPANION_URI = URI.create("http://localhost:5173/");
    private static final URL HEALTH_URL = createHealthUrl();

    public MCreatorAICopilotPlugin(Plugin plugin) {
        super(plugin);

        addListener(MCreatorLoadedEvent.class, event -> SwingUtilities.invokeLater(() -> {
            BasicAction openCopilot = new BasicAction(
                    event.getMCreator().getActionRegistry(),
                    "Open AI Copilot",
                    actionEvent -> openCompanion()
            );

            JMenu menu = new JMenu("AI Copilot");
            menu.add(openCopilot);
            event.getMCreator().getMainMenuBar().add(menu);
            event.getMCreator().getToolBar().addToRightToolbar(openCopilot);
        }));

        LOG.info("MCreator AI Copilot plugin loaded");
    }

    private static URL createHealthUrl() {
        try {
            return URI.create("http://127.0.0.1:8787/api/health").toURL();
        } catch (Exception exception) {
            throw new ExceptionInInitializerError(exception);
        }
    }

    private static void openCompanion() {
        if (!isCompanionApiAvailable()) {
            JOptionPane.showMessageDialog(
                    null,
                    "The local AI Copilot service is not responding.\n\n"
                            + "Start the companion from the repository folder with:\n"
                            + "npm install\nnpm run dev\n\n"
                            + "Then click AI Copilot again.",
                    "MCreator AI Copilot — companion not running",
                    JOptionPane.WARNING_MESSAGE
            );
            return;
        }

        if (!Desktop.isDesktopSupported() || !Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
            JOptionPane.showMessageDialog(
                    null,
                    "Your desktop environment cannot open a browser automatically.\n"
                            + "Open http://127.0.0.1:5173/ manually.",
                    "MCreator AI Copilot",
                    JOptionPane.INFORMATION_MESSAGE
            );
            return;
        }

        try {
            Desktop.getDesktop().browse(COMPANION_URI);
        } catch (IOException exception) {
            LOG.error("Could not open the local AI Copilot UI", exception);
            JOptionPane.showMessageDialog(
                    null,
                    "Could not open the browser. Open http://127.0.0.1:5173/ manually.",
                    "MCreator AI Copilot",
                    JOptionPane.ERROR_MESSAGE
            );
        }
    }

    private static boolean isCompanionApiAvailable() {
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) HEALTH_URL.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout((int) TimeUnit.SECONDS.toMillis(2));
            connection.setReadTimeout((int) TimeUnit.SECONDS.toMillis(2));
            connection.setRequestProperty("Accept", "application/json");
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                return false;
            }
            byte[] response = connection.getInputStream().readNBytes(4096);
            String body = new String(response, StandardCharsets.UTF_8);
            return body.contains("\"ok\":true");
        } catch (IOException exception) {
            LOG.debug("Local AI Copilot API is not available yet", exception);
            return false;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
