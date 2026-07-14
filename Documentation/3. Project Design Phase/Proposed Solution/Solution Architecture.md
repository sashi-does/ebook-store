# Proposed Solution & Architecture

## System Diagram

```
                 +-----------------------------------------+
                 |              React Client               |
                 |  (Home, Books, Details, Cart, Admin)    |
                 +--------------------+--------------------+
                                      | (JSON API / Axios Proxy)
                                      v
                 +--------------------+--------------------+
                 |             Express.js                  |
                 |      (Auth, Books, Orders, Reviews)     |
                 +--------------------+--------------------+
                                      | (Mongoose ODM)
                                      v
                 +--------------------+--------------------+
                 |         MongoDB database Cloud          |
                 |     (Users, Books, Orders, Reviews)     |
                 +-----------------------------------------+
```

## Architectural Highlights
- **Stateless Session Control**: JSON Web Tokens are passed securely, keeping the API layer stateless and easily scalable.
- **Vite Proxy Mapping**: Client-side axios requests use `/api` pathways, which are routed to the backend port during development to avoid CORS issues.
- **Responsive Layout**: Fluid layouts and CSS grid positioning ensure an optimized browsing experience across mobile, tablet, and desktop devices.
