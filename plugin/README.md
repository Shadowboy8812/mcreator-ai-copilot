# MCreator plugin scaffold

This directory is a placeholder for the native Java plugin. The current MVP web app is not yet a native MCreator plugin.

Before implementation:
1. Select and pin the MCreator version to support.
2. Start from the official Demo Java Plugin template: https://github.com/MCreator/DemoJavaPlugin
3. Confirm extension points and dependency versions against: https://mcreator.net/wiki/developing-mcreator-plugins
4. Implement a menu/action that sends an explicitly approved prompt to the local companion API.
5. Add connection status, timeouts, error handling, and safe artifact handling.
6. Test on a clean MCreator installation for the pinned version.

Do not ship this folder as an installable plugin until its entry point, build, and installation have been verified.
