# File: src/components/Header.tsx

## Analysis
- **Type**: Layout Component
- **Purpose**: Main navigation bar with logo, links, language toggle, and auth status.
- **Key Logic**:
    - **Responsive**: Adapts layout for mobile/desktop. Hamburger menu for mobile.
    - **Auth**: Shows "Account" button if logged in (`/dashboard`), otherwise "Login" (`/sign-up`). Note: Login redirects to Sign Up?
    - **Language**: Toggles language context.
- **Dependencies**: `react-router-dom`, `lucide-react`, `LanguageContext`, `AuthContext`.

## Identified Bugs / Issues
1.  **[Logic] Auth Flow**: `handleAccountClick` (Line 30) redirects to `/sign-up` if not logged in. Usually, "Login" button should go to `/login` or open a login modal. `AdminLogin` exists but no generic user login page is apparent in the routes (only `/sign-up`, `/verify-nid`).
2.  **[UI] Hardcoded Data**: Notification badge count "3" (Line 75) is hardcoded.
