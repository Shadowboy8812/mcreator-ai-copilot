# Native MCreator AI Copilot plugin

This is now a first native Java plugin implementation, based on the official [MCreator DemoJavaPlugin template](https://github.com/MCreator/DemoJavaPlugin). It adds an **AI Copilot → Open AI Copilot** menu and toolbar action.

## What it does
- Checks `http://127.0.0.1:8787/api/health` with short connection/read timeouts.
- If the local companion is running, opens `http://localhost:5173/` in the default browser.
- If it is not running, shows an actionable message instead of silently failing.
- Does not store or transmit AI provider keys from MCreator.

It is a native launch bridge, not yet an in-workspace AI editor. It does not create mod elements or write into workspaces.

## Version compatibility
The manifest currently declares **MCreator 2026.3** using the official 2026.3 demo-template version identifiers. The API and Java toolchain should be validated against the exact MCreator 2026.x release installed before widening `supportedversions`. Do not claim 2026.1 or 2026.2 compatibility based on the 2026.3 build alone.

Official references:
- [DemoJavaPlugin](https://github.com/MCreator/DemoJavaPlugin)
- [Developing MCreator plugins](https://mcreator.net/wiki/developing-mcreator-plugins)
- [MCreator plugin installation](https://mcreator.net/wiki/understand-plugins)

## Build against a local MCreator source project
1. Install the JDK required by your MCreator release.
2. Obtain the matching MCreator source Gradle project.
3. Copy `gradle.properties.example` to `gradle.properties`.
4. Set `mcreator_path` to the absolute path of that source project.
5. From this directory, run the Gradle `jar` task using the Gradle version required by the matching MCreator project.
6. The output should be `build/libs/mcreator-ai-copilot-plugin.zip`.

The build uses MCreator's own project as a Gradle subproject, like the official template. A build cannot be confirmed until it is run against a real matching MCreator source checkout. Do not distribute this ZIP until it builds and has been loaded in a clean MCreator installation.

## Install for a manual smoke test
1. Start the companion from the repository root with `npm install` and `npm run dev`.
2. Build the plugin as described above.
3. In MCreator, enable Java plugins under Preferences → Manage plugins.
4. Use Preferences → Manage plugins → Load plugin and select the generated ZIP.
5. Restart MCreator. Click **AI Copilot → Open AI Copilot** or the toolbar action.
6. Verify the UI opens and that the not-running message appears if the API is stopped.

## Local settings
The companion binds the API to `127.0.0.1` only. This is intentional: an AI provider key may be configured in the local server environment and the API should not be exposed to other devices on the network.
