# Brainstorming, Idea Generation, and Prioritization

## 1. Brainstorming Core Themes
We explored several directions for the Book Haven online storefront:
- **Immersive Visual Focus**: A UI emphasizing rich book covers, clean custom layouts, and a cohesive theme to stand out from generic e-commerce layouts.
- **Dynamic Catalog Navigation**: Quick filtering options combined with instant backend database lookups.
- **Role-Based Workflows**: Creating an interface that adapts based on whether the logged-in user is a standard buyer or an administrator.

## 2. Idea Generation Matrix
We generated ideas for features and prioritized them based on complexity vs. value:
- **Idea A (High Value, Medium Complexity)**: Stateless JWT authentication delivered via both cookies and JSON responses. *Status: Selected.*
- **Idea B (High Value, Low Complexity)**: Clean CSS-based Glassmorphic style design with instant light/dark mode support. *Status: Selected.*
- **Idea C (High Value, Medium Complexity)**: Embedded reviews engine with live aggregate calculations. *Status: Selected.*
- **Idea D (Medium Value, High Complexity)**: Real-time physical delivery tracking integration. *Status: Deferred to future versions.*

## 3. Prioritization & Roadmap
We selected a core set of features to guarantee a production-quality application:
1. **Security**: Bcrypt password hashing + stateless route protection.
2. **Browsing**: Title/author/genre indexing with sort limits.
3. **Cart Operations**: Session-backed checkout validation.
4. **Dashboard**: Live administration overview panel.
