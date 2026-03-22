# Guide to Running AI Documentation Commands for Angular Project

This guide explains how to use the pre-configured AI commands in `.claude/commands/` to keep your Angular project documentation updated and organized.

---

## 1. Folder Structure

Ensure your project contains the following:

```
MyProject/
 ├── src/                 # Angular source code
 ├── .claude/
 │     └── commands/      # AI command files
 ├── docs/                # Generated documentation
 ├── claude.md            # Original notes file
 └── readme.md            # Project readme
```

The `/docs` folder will contain:
```
docs/
 ├── PROJECT_OVERVIEW.md
 ├── Architecture.md
 ├── Angular_Structure.md
 ├── UI_Design.md
 ├── Business_Rules.md
 ├── Setup.md
 ├── CHANGELOG.md
 └── Extras/
       ├── claude_full.md
       ├── claude_parts/
       └── diagrams/
```

---

## 2. Command Descriptions and Usage

### 2.1 Sync Documentation After Any Code Change

**Command:** `/docs-sync`

**Purpose:** Update existing documentation files that reflect the current Angular code changes without rewriting everything.

**Steps:**
1. Run `/docs-sync`.
2. AI scans `src/` for changes.
3. Updates relevant files: Angular_Structure.md, UI_Design.md, Business_Rules.md.
4. Keeps historical notes intact.
5. Updates CHANGELOG.md with what was modified.

---

### 2.2 Document a New Feature

**Command:** `/docs-new-feature`

**Purpose:** Add documentation for newly implemented feature or module.

**Steps:**
1. Run `/docs-new-feature` after coding a new feature.
2. AI detects new components/services.
3. Updates:
   - PROJECT_OVERVIEW.md
   - Angular_Structure.md
   - Business_Rules.md
   - Architecture.md (if structure changed)
4. Adds summary entry to CHANGELOG.md.

---

### 2.3 Detect and Document Structure Changes

**Command:** `/docs-detect-structure`

**Purpose:** Keep documentation in sync with folder or module structure changes.

**Steps:**
1. Run `/docs-detect-structure` after adding new modules/folders.
2. AI creates new Markdown files in `/docs` if needed.
3. Updates references in PROJECT_OVERVIEW.md.

---

### 2.4 Full Documentation Refresh

**Command:** `/docs-refresh`

**Purpose:** Validate and clean all documentation periodically.

**Steps:**
1. Run `/docs-refresh` weekly or before release.
2. AI checks for inconsistencies, outdated sections, missing documentation.
3. Updates formatting and ensures all cross-references are correct.
4. Adds a 'Documentation Refresh' entry in CHANGELOG.md.

---

### 2.5 Update All Main Documentation Files

**Command:** `/docs-update-all`

**Purpose:** Synchronize all primary docs at once after major changes.

**Steps:**
1. Run `/docs-update-all` after a big refactor or feature merge.
2. AI updates:
   - PROJECT_OVERVIEW.md
   - Architecture.md
   - Angular_Structure.md
   - UI_Design.md
   - Business_Rules.md
   - readme.md
3. Preserves historical notes in claude_full.md.
4. Updates CHANGELOG.md with the update summary.

---

## 3. Recommended Routine

| Frequency | Command |
|-----------|--------|
| After small code changes | `/docs-sync` |
| After adding a new feature | `/docs-new-feature` |
| After refactoring or routing changes | `/docs-detect-structure` |
| Weekly or pre-release | `/docs-refresh` |
| After large merge or major update | `/docs-update-all` |

---

## 4. Notes

- `/docs` folder is the **single source of truth** for documentation.
- `claude.md` remains in Extras as the original reference.
- Always update CHANGELOG.md through these commands, never manually.
- PROJECT_OVERVIEW.md should be used as the primary reference for AI in new conversations.

