# Hausarzt Cottbus - Documentation

Welcome to the complete documentation for the Hausarzt Cottbus Angular project.

## Where to Start

### If you're new to this project:
1. **Start with [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Get the big picture of what this project is about
2. **Read [Setup.md](./Setup.md)** - Set up your development environment
3. **Review [Architecture.md](./Architecture.md)** - Understand the project structure

### If you need to build something:
- **[Angular_Structure.md](./Angular_Structure.md)** - Understand components, services, and modules
- **[UI_Design.md](./UI_Design.md)** - Learn styling conventions and responsive design
- **[Business_Rules.md](./Business_Rules.md)** - Understand validation and business logic

### If you're making changes:
- **[CHANGELOG.md](./CHANGELOG.md)** - See what's been done and what's planned
- **[Architecture.md](./Architecture.md)** - Understand how things fit together

## Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **PROJECT_OVERVIEW.md** | Main reference with project purpose, tech stack, structure, and quick start | Everyone |
| **Architecture.md** | Project structure, routing, DI, services, styling, build pipeline | Developers & Architects |
| **Angular_Structure.md** | Components, services, modules, animations library details | Frontend Developers |
| **UI_Design.md** | Styling, CSS variables, responsive design, animations, accessibility | Frontend Developers & Designers |
| **Business_Rules.md** | Validation rules, workflows, error handling, SEO | Frontend Developers |
| **Setup.md** | Development environment, installation, configuration, debugging | Developers |
| **CHANGELOG.md** | Version history and release notes | Project Managers & Developers |

## Quick Navigation

### Essential Commands
```bash
npm start           # Launch PHP backend (:8001) + Angular dev server (:4200) together via server/start-dev.js
npm run start:php   # PHP backend only (fallback for two-terminal workflow)
npm run start:ng    # Angular dev server only (fallback)
npm run build       # Production build
npm run test        # Run unit tests
ng generate         # Create new components
```
See [Setup.md](./Setup.md#starting-the-development-server) for the full local dev workflow.

### Key Locations
- **Source Code**: `src/app/`
- **Styles**: `src/styles.scss`
- **Assets**: `src/assets/`
- **Components**: `src/app/components/`
- **Pages**: `src/app/pages/`
- **Services**: `src/app/core/services/`

### Technologies
- Angular 19.2.0
- TypeScript 5.7.2
- SCSS (with CSS Custom Properties)
- ng-zorro-antd (UI components)
- Bootstrap 5
- Owl Carousel (galleries)
- Google Maps

## Common Tasks

### Adding a New Page
1. Create component in `src/app/pages/`
2. Add route configuration
3. Style with SCSS following conventions in UI_Design.md
4. Update navigation links

### Creating a Reusable Component
1. Create component in `src/app/components/`
2. Define @Input() and @Output() properties
3. Style independently
4. Document the component

### Implementing Form Validation
1. Follow patterns in Business_Rules.md
2. Use Angular Forms with validators
3. Show errors only when appropriate
4. Handle async validation if needed

### Styling a Component
1. Use CSS custom properties from global styles
2. Follow BEM naming convention
3. Keep styles scoped to component
4. Use SCSS features: nesting, variables, mixins
5. Ensure mobile responsiveness

## Documentation Structure

```
docs/
├── README.md                    # This file
├── PROJECT_OVERVIEW.md         # Main reference
├── Architecture.md             # Project structure
├── Angular_Structure.md        # Components & services
├── UI_Design.md               # Styling guide
├── Business_Rules.md          # Validation & workflows
├── Setup.md                   # Development setup
├── CHANGELOG.md               # Version history
├── Extras/
│   └── claude_full.md         # Full documentation backup
└── diagrams/                  # (Future: Component diagrams)
```

## For AI Assistants

When working on this project:

1. **First interaction**: Read PROJECT_OVERVIEW.md for context
2. **Before coding**: Check relevant documentation files
3. **For questions about**:
   - Structure → Architecture.md
   - Components → Angular_Structure.md
   - Styling → UI_Design.md
   - Validation → Business_Rules.md
   - Setup → Setup.md
4. **Before modifications**: Understand existing patterns in documented files
5. **When adding features**: Update relevant documentation

## Getting Help

### Setup Issues?
→ See [Setup.md](./Setup.md) Troubleshooting section

### Component Questions?
→ See [Angular_Structure.md](./Angular_Structure.md)

### Styling Help?
→ See [UI_Design.md](./UI_Design.md)

### Business Logic?
→ See [Business_Rules.md](./Business_Rules.md)

### Architecture Decisions?
→ See [Architecture.md](./Architecture.md)

### Version Information?
→ See [CHANGELOG.md](./CHANGELOG.md)

## Contributing to Documentation

### When to Update Docs
- Adding new features
- Changing architecture
- Creating new components
- Modifying validation rules
- Updating dependencies

### How to Update
1. Find relevant documentation file
2. Add or update information
3. Keep formatting consistent
4. Update cross-references
5. Check links still work

### Documentation Standards
- Use clear, concise language
- Include code examples where helpful
- Link to related documentation
- Keep files focused on one topic
- Use proper markdown formatting

## Project Status

**Current Version**: 0.0.0 (Initial Release)
**Last Updated**: 2026-05-10
**Documentation Version**: 1.6

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and roadmap.

## Key Contacts

For specific questions about documentation or project, refer to git history or ask on the project team.

---

**Happy coding! For detailed information on any topic, select the relevant documentation file above.**
