# File: src/services/aiService.ts

## Analysis
- **Type**: Service
- **Purpose**: Handled AI chat interactions using Hugging Face format.
- **Key Logic**:
    - **API**: Connects to Hugging Face Inference API (`google/gemma-2b-it`).
    - **Fallback**: Changes to local mock responses if no API Key is provided (`VITE_HF_API_KEY`).
    - **Formatting**: Implements Gemma-specific prompt formatting (`<start_of_turn>`).
- **Dependencies**: `VITE_HF_API_KEY` (env).

## Identified Bugs / Issues
1.  **[Config] Missing API Key**: Relies on `import.meta.env.VITE_HF_API_KEY` which is likely missing in the repo, forcing the app into "Mock Mode".
