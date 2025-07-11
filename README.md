<div align="center">
  <img src="https://github.com/pratik-codes/rust-blueprint/blob/main/public/blueprint-cover.png" alt="Rust Blueprint Logo" width="400"/>
  
  # 🦀 Rust Blueprint 
  
  **Blazingly fast project scaffolding for Rustaceans**
  
  [![Status: In Progress](https://img.shields.io/badge/status-in--progress-orange.svg)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 🚀 What is Rust Blueprint?

Rust Blueprint is a powerful CLI tool that generates production-ready Rust web applications in seconds. Whether you're building a REST API, GraphQL server, or full-stack application, Rust Blueprint sets up the perfect project structure so you can focus on writing business logic, not boilerplate.

### 🎯 Why Rust Blueprint?

- **⚡ Lightning Fast Setup**: Generate a complete project structure in under 10 seconds
- **🔧 Framework Flexibility**: Choose from popular Rust web frameworks
- **🗄️ Database Ready**: Pre-configured database connections and migrations
- **🎨 Modern Tooling**: Includes hot-reloading, formatting, and linting out of the box
- **🐳 Production Ready**: Docker, CI/CD, and deployment configurations included
- **🦾 Type Safety**: Leverage Rust's powerful type system from day one

## 📦 Installation
```bash
cargo install rust-blueprint
```

Or install from source:

```bash
git clone https://github.com/rust-blueprint/rust-blueprint
cd rust-blueprint
cargo install --path .
```

## 🎮 Quick Start

### Interactive Mode (Recommended)

```bash
rust-blueprint create
```

### Command Line Mode

```bash
rust-blueprint create --name my-awesome-api --framework axum --database postgres
```

### With Advanced Features

```bash
rust-blueprint create --name my-app --framework axum --database postgres --features docker,github-actions
```

## 🛠️ Supported Technologies

### Web Frameworks

| Framework | Description | Status |
|-----------|-------------|---------|
| **Axum** | Ergonomic and modular web framework | ✅ Stable |
| **Actix Web** | Powerful, pragmatic, and extremely fast | ✅ Stable |
| **Rocket** | Type-safe web framework with focus on usability | ✅ Stable |
| **Warp** | Composable, fast web server framework | ✅ Stable |
| **Tide** | Modular web framework built on async-std | 🚧 Beta |
| **Poem** | Full-featured and easy-to-use web framework | 🚧 Beta |

### Databases

| Database | Driver/ORM Options | Migration Support |
|----------|-------------------|-------------------|
| **PostgreSQL** | SQLx, Diesel, SeaORM | ✅ |
| **MySQL/MariaDB** | SQLx, Diesel, SeaORM | ✅ |
| **SQLite** | SQLx, Diesel, SeaORM | ✅ |
| **MongoDB** | Official Driver | ✅ |
| **Redis** | redis-rs | N/A |
| **ScyllaDB** | scylla-rust-driver | ✅ |

### Advanced Features

- 🐳 **Docker** - Multi-stage Dockerfile optimized for Rust
- 🔄 **CI/CD** - GitHub Actions, GitLab CI, or Jenkins
- 🌐 **GraphQL** - Async-graphql or Juniper integration
- 🔌 **WebSocket** - Real-time communication support
- 📊 **Telemetry** - OpenTelemetry and structured logging
- 🎨 **Frontend** - HTMX, Leptos, or React/Vue.js integration
- 📝 **API Docs** - OpenAPI/Swagger documentation
- 🧪 **Testing** - Unit, integration, and E2E test setup

