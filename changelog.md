# Changelog

All the notable additions and fixes.

This changelog follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

# [1.1.5] - 2024-12-27

### Changed

- Updated login form to use react-hook-form

### Fixed

- Compile error due to width and height not specified for Image component in account page

# [1.1.4] - 2024-12-26

### Added

- /reset-password route along with `ResetPasswordFormData` type
- Email notifications for resetting password alongside new email templates
- `reset_password` database table. Schema added to notion
- Token generation, storing, and clearing from redis instance
- All appropriate validation for token (expired, invalid, multi-requested etc.)
- `api.md` for API reference. Filled with new updates **only** for push 1.1.4

### Changed

- useCallback for useEffect dependencies inside existing codebase (as per build warnings)

# [1.1.3] - 2024-12-24

### Added

- New icons for no-logo-found and websites on Partners component cards

### Changed

- Mobile-friendly UI for Partners element. Enabled flex-col of partner cards
- Mobile-friendly UI for send-email page
- More spacing on /account/edit-details form

# [1.1.2] - 2024-12-24

### Added

- New societies page.
- Integrated SendGrid for user-to-society messaging.
- Implemented skeleton fallback and pagination for improved UX on the societies page.
- New "Message Society" page.
- Introduced custom email message templates in both HTML and plain text formats.

### Changed

- Tags are now capped at 3 in the schema, with enforcement in the frontend.
- Updated the registration page to include fields for website, description, and tags.
- Relocated a non-component function to lib/utils for better organization.
- Enhanced session checking to handle edge cases for improved robustness.

# [1.1.1] - 2024-12-15

### Added

- Added 'Website', 'Description', and 'Tags' fields to /account page
- Editing page for accounts

# [1.1.0] - 2024-11-24

### Added 

- Editing events in Account page
- Registering for events (Events page registration + Accounts page list of registrees)

# [1.0.3] - 2024-10-29

### Added

- Addition of Vercel Analytics

# [1.0.2] - 2024-09-25

### Added

- Society registration (name, email, password, optional logo)
- Event filtering 
- Toggleable buttons for event filtering
- 'For External Students' section to event
- Added account dropdown to navbar
- Event caching onto homepage for hour-long caching

# [1.0.1] - 2024-09-23

### Added

- Blob storage (Vercel image store)
- Image uploading inside `event-create.tsx`

# [1.0.0] - 2024-09-20
## The Original Release!

- Registration + Log In
- Events page
- About Us page
- Contact Us page
- Admin page (tables)
- Home page (carousel, snap scroll)


