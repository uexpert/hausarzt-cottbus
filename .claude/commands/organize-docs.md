# organize-docs.md

project-path: F:/Angular_Projekts/hausarzt_cottbus/
output-folder: F:/Angular_Projekts/hausarzt_cottbus/docs
tasks:
  - Read all project files including:
      - claude.md
      - readme.md
      - Angular source files (src/)
  - Create a folder /docs if it does not exist
  - Generate a main summary file PROJECT_OVERVIEW.md containing:
      - Project purpose
      - Tech stack
      - Modules/components overview
      - Quick start instructions for running the Angular app
  - Split claude.md into separate files for each section relevant to Angular:
      - Architecture.md (overall project structure & routing)
      - Angular_Structure.md (modules, components, services, models)
      - UI_Design.md (CSS, styling conventions, theming)
      - Business_Rules.md (any frontend validation or workflows)
  - Place each split file inside /docs
  - Keep a full copy of claude.md in /docs/Extras/claude_full.md
  - Create placeholder files for:
      - Setup.md (how to run locally, dependencies)
      - CHANGELOG.md (for tracking future updates)
  - Update readme.md to:
      - Refer to PROJECT_OVERVIEW.md
      - Provide links to detailed docs in /docs
  - Optionally, create subfolders inside /docs for:
      - diagrams/ (component diagrams, UI flow diagrams)
      - claude_parts/ (if claude.md is split into multiple parts)
  - Ensure all Markdown files are well-formatted and ready for AI reference
notes:
  - PROJECT_OVERVIEW.md will be the main reference for future AI conversations
  - Any future changes should update /docs accordingly