## Changelog

### [2.0.2] - 20-11-2026
- Fixed infinite scroll loading unrelated history into search results
- Fixed infinite scroll getting stuck and showing duplicate items
- Fixed out of order search results while typing
- Fixed tabs search missing results, failing on characters like `(` or `+`, and not filtering other devices
- Delete/Backspace on a selected item now asks for confirmation and deletes the selected item (also with "Sort by most visit")
- Alt + (1 - 9) now opens the nth item as displayed, and restores whole windows in the tabs view
- Fixed keyboard navigation errors and the first Down press in the tabs view
- Fixed settings not saving when changed quickly (storage write limit) and stray keys in sync storage
- Fixed the Cancel button being invisible in the light theme, Escape now closes dialogs
- Removed the publicly accessible icon resource

### [2.0.1] - 01-03-2023
- Updated dependencies
- Minor performance improvements

### [2.0.0] - 01-03-2023
- Switched to Redux for state management
- Switched to Vite for bundling
- Upgraded to React 18
- Increased favicon quality with New Favicon API
- Added option to delete history in time ranges
- Improved keyboard navigation and shortcuts
- Changed shortcuts modifier from CTRL to Alt/Option
- Added setting to set tab (current or new blank) for opening URLs
- Added hide time and accent font color settings in options
- Improved UI and UX

### [1.0.8] - 08-04-2021
- Switch from node-sass to sass (dart sass)

### [1.0.7] - 07-04-2020

- Upgraded to React 17
- Fixed dark mode delay with light splash
- Added prettier config for consistency
- Added eslint config
- Upgraded all dependencies