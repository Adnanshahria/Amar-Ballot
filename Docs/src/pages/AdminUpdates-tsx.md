# File: src/pages/AdminUpdates.tsx

## Analysis
- **Type**: Admin Page (CRUD)
- **Purpose**: Post news and election updates.
- **Key Logic**:
    - **Image Handling**: Reads file input as Data URL (Base64 string) and stores it directly in the text field/database payload.
- **Dependencies**: `api`.

## Identified Bugs / Issues
1.  **[Performance/Architecture] Base64 Images**: Storing images as Base64 strings in a SQL database (via `addUpdate` API) is an anti-pattern. It bloats the database significantly and slows down API responses.
    - **Risk**: If the DB has a payload limit (e.g., 1MB or 4MB), uploading a high-res photo will crash the insert. The client-side check limits to 5MB, which is likely too large for a single row text column in many setups.
