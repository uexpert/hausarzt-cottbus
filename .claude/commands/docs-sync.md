# docs-sync.md
Sync all documentation for the Fullstack Angular + .NET project.

Tasks:
1. Scan the Angular frontend (`src/`) and the .NET backend (`backend/`) directories for code changes.
2. Compare implementation with existing files in `/docs`.
3. Update the following documentation files as needed:
   - PROJECT_OVERVIEW.md
   - Architecture.md
   - Angular_Structure.md
   - DotNet_Backend.md
   - Database_Model.md
   - UI_Design.md
   - Business_Rules.md
   - readme.md
4. Preserve historical notes in `Extras/claude_full.md`.
5. Add summary entries to CHANGELOG.md describing updated sections.
6. Maintain proper Markdown formatting and structure.
7. Do NOT invent features; document only what exists in the current code.

Usage:
- Run this command after any frontend or backend code changes to synchronize documentation with the actual project state.