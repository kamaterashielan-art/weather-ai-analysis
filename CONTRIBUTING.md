# Contributing Guidelines

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/weather-ai-analysis.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit with clear messages: `git commit -m 'Add feature description'`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Code Style

### JavaScript/Node.js
- Use ESLint configuration provided
- Follow Airbnb style guide
- Use async/await over callbacks
- Add JSDoc comments for functions

### Python
- Follow PEP 8 style guide
- Use type hints
- Add docstrings to functions and classes
- Use Black for code formatting

### React/Frontend
- Use functional components with hooks
- Follow component naming conventions
- Keep components small and focused
- Use TypeScript for type safety

## Testing

- Write tests for new features
- Maintain minimum 80% code coverage
- Run tests before submitting PR: `npm test` or `pytest tests/`
- Include both unit and integration tests

## Commit Messages

Follow conventional commits format:
```
type(scope): subject

body

footer
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(weather): add temperature prediction endpoint

Add new endpoint to get temperature predictions using MIMO model.
Includes caching and error handling.

Closes #123
```

## Pull Request Process

1. Update README.md with any new features
2. Update ARCHITECTURE.md if structure changes
3. Ensure all tests pass
4. Request review from maintainers
5. Address review comments
6. Squash commits if requested

## Reporting Issues

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots/logs if applicable

## Questions?

Open an issue or contact the maintainers.
