# Project Consultation Template for AI (English)

Use this template at the start of any new chat to consult about a project with full reference to its documentation.

---

## 1. Project Reference

```text
Project: <Project Name>
Stack: <Frontend + Backend Stack>
Docs location: /docs
```

Replace `<Project Name>` and `<Frontend + Backend Stack>` with the actual project details.

---

## 2. Consultation Goal / Task

Clearly state what you want:

Examples:
- **Feature explanation:**
  "Explain how the `UserModule` works and which services it uses."
- **Code modification:**
  "I want to add a new feature to the `DashboardComponent`. Suggest the changes and update documentation accordingly."
- **Bug investigation:**
  "There’s an issue with `LoginService`. Check the docs and suggest possible causes."
- **Documentation update:**
  "Update the docs for the new component added last week."

---

## 3. Reference Documentation

Specify which files to use for context:

```text
Reference files:
/docs/PROJECT_OVERVIEW.md
/docs/Architecture.md
/docs/Angular_Structure.md
/docs/DotNet_Backend.md
/docs/Business_Rules.md
/docs/Extras/claude_full.md  # optional full notes
```

---

## 4. Optional Commands for Documentation Updates

You can instruct AI to run pre-defined commands from `.claude/commands/`:

- `/docs-sync` → update only modified sections
- `/docs-new-feature` → document a new feature
- `/docs-detect-structure` → detect structural changes
- `/docs-refresh` → full documentation validation
- `/docs-update-all` → synchronize all main documentation files

---

## 5. Example Usage

```text
Project: MyProject
Stack: Angular + .NET
Docs location: /docs

Task: Add a new feature to DashboardComponent to display recent user activities.

Reference files:
/docs/PROJECT_OVERVIEW.md
/docs/Angular_Structure.md
/docs/DotNet_Backend.md
/docs/Business_Rules.md

Please suggest code changes and update documentation accordingly.
```

---

💡 Tip: Use this template for any new conversation. Replace project-specific names, stack, and task details to instantly give AI the full context.

