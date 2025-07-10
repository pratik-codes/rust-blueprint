
## Phase 1: Core CLI Foundation

### 1.1 Initial Setup

```bash
# Create project
cargo new rust-blueprint --bin
cd rust-blueprint

# Add core dependencies
cargo add clap --features derive
cargo add anyhow
cargo add thiserror
cargo add serde --features derive
cargo add serde_json
cargo add toml
```

### 1.2 Basic CLI Structure

**Cargo.toml**:
```toml
[package]
name = "rust-blueprint"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <email@example.com>"]
description = "Blazingly fast project scaffolding for Rust web applications"
license = "MIT"
repository = "https://github.com/rust-blueprint/rust-blueprint"
keywords = ["cli", "scaffold", "template", "web", "generator"]
categories = ["command-line-utilities", "development-tools"]

[dependencies]
clap = { version = "4.4", features = ["derive", "env"] }
anyhow = "1.0"
thiserror = "1.0"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
toml = "0.8"
```

**src/main.rs**:
```rust
use anyhow::Result;
use clap::Parser;

mod cli;
mod core;

use cli::Cli;

fn main() -> Result<()> {
    let cli = Cli::parse();
    cli.execute()
}
```

**src/cli/mod.rs**:
```rust
pub mod args;
pub mod commands;

pub use args::Cli;
```

**src/cli/args.rs**:
```rust
use clap::{Parser, Subcommand};
use anyhow::Result;

#[derive(Parser)]
#[command(
    name = "rust-blueprint",
    about = "Blazingly fast project scaffolding for Rust web applications",
    version,
    author
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Create a new Rust project
    Create(CreateArgs),
    /// List available frameworks, databases, or features
    List {
        #[arg(value_enum)]
        category: ListCategory,
    },
    /// Validate a rust-blueprint project
    Validate {
        /// Path to the project
        #[arg(default_value = ".")]
        path: String,
    },
}

#[derive(clap::ValueEnum, Clone)]
pub enum ListCategory {
    Frameworks,
    Databases,
    Features,
    All,
}

#[derive(Parser)]
pub struct CreateArgs {
    /// Project name
    #[arg(short, long)]
    pub name: Option<String>,
    
    /// Web framework to use
    #[arg(short, long, value_enum)]
    pub framework: Option<Framework>,
    
    /// Database to integrate
    #[arg(short, long, value_enum)]
    pub database: Option<Database>,
    
    /// Additional features
    #[arg(long, value_delimiter = ',')]
    pub features: Vec<Feature>,
    
    /// Skip interactive prompts
    #[arg(long)]
    pub no_interactive: bool,
    
    /// Initialize git repository
    #[arg(long, default_value = "true")]
    pub git: bool,
}

#[derive(clap::ValueEnum, Clone, Copy, Debug)]
pub enum Framework {
    Axum,
    ActixWeb,
    Rocket,
    Warp,
    Tide,
    Poem,
}

#[derive(clap::ValueEnum, Clone, Copy, Debug)]
pub enum Database {
    Postgres,
    Mysql,
    Sqlite,
    Mongodb,
    Redis,
    Scylladb,
    None,
}

#[derive(clap::ValueEnum, Clone, Copy, Debug)]
pub enum Feature {
    Docker,
    GithubActions,
    Graphql,
    Websocket,
    Telemetry,
    Htmx,
    Leptos,
    React,
    OpenApi,
}

impl Cli {
    pub fn execute(self) -> Result<()> {
        match self.command {
            Commands::Create(args) => commands::create::execute(args),
            Commands::List { category } => commands::list::execute(category),
            Commands::Validate { path } => commands::validate::execute(path),
        }
    }
}
```

### 1.3 Core Types and Error Handling

**src/core/error.rs**:
```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum BlueprintError {
    #[error("Invalid project name: {0}")]
    InvalidProjectName(String),
    
    #[error("Directory already exists: {0}")]
    DirectoryExists(String),
    
    #[error("Template error: {0}")]
    TemplateError(#[from] tera::Error),
    
    #[error("IO error: {0}")]
    IoError(#[from] std::io::Error),
    
    #[error("Git error: {0}")]
    GitError(String),
}

pub type Result<T> = std::result::Result<T, BlueprintError>;
```

**src/core/config.rs**:
```rust
use serde::{Deserialize, Serialize};
use crate::cli::args::{Framework, Database, Feature};

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectConfig {
    pub name: String,
    pub framework: Framework,
    pub database: Option<Database>,
    pub features: Vec<Feature>,
    pub metadata: ProjectMetadata,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectMetadata {
    pub rust_version: String,
    pub created_at: String,
    pub blueprint_version: String,
}

impl ProjectConfig {
    pub fn new(name: String, framework: Framework) -> Self {
        Self {
            name,
            framework,
            database: None,
            features: Vec::new(),
            metadata: ProjectMetadata {
                rust_version: "1.75".to_string(),
                created_at: chrono::Utc::now().to_rfc3339(),
                blueprint_version: env!("CARGO_PKG_VERSION").to_string(),
            },
        }
    }
}
```

## Phase 2: Template System

### 2.1 Template Engine Setup

**Add dependencies**:
```bash
cargo add tera
cargo add rust-embed --features compression
cargo add once_cell
```

**src/templates/engine.rs**:
```rust
use once_cell::sync::Lazy;
use rust_embed::RustEmbed;
use tera::{Context, Tera};
use std::collections::HashMap;
use anyhow::Result;

#[derive(RustEmbed)]
#[folder = "templates/"]
#[include = "**/*.tera"]
struct TemplateAssets;

static TERA: Lazy<Tera> = Lazy::new(|| {
    let mut tera = Tera::default();
    
    // Load all embedded templates
    for file in TemplateAssets::iter() {
        let path = file.as_ref();
        if let Some(content) = TemplateAssets::get(path) {
            let content_str = std::str::from_utf8(content.data.as_ref())
                .expect("Template file is not valid UTF-8");
            
            tera.add_raw_template(path, content_str)
                .expect("Failed to add template");
        }
    }
    
    // Register custom filters
    tera.register_filter("snake_case", filters::snake_case);
    tera.register_filter("pascal_case", filters::pascal_case);
    
    tera
});

pub struct TemplateEngine {
    context: Context,
}

impl TemplateEngine {
    pub fn new() -> Self {
        Self {
            context: Context::new(),
        }
    }
    
    pub fn with_context(mut self, key: &str, value: impl serde::Serialize) -> Self {
        self.context.insert(key, &value);
        self
    }
    
    pub fn render(&self, template_name: &str) -> Result<String> {
        Ok(TERA.render(template_name, &self.context)?)
    }
    
    pub fn render_to_file(&self, template_name: &str, output_path: &Path) -> Result<()> {
        let content = self.render(template_name)?;
        std::fs::create_dir_all(output_path.parent().unwrap())?;
        std::fs::write(output_path, content)?;
        Ok(())
    }
}

mod filters {
    use tera::{Value, Result};
    use convert_case::{Case, Casing};
    
    pub fn snake_case(value: &Value, _: &HashMap<String, Value>) -> Result<Value> {
        let s = value.as_str().ok_or_else(|| {
            tera::Error::msg("snake_case filter expects a string")
        })?;
        Ok(Value::String(s.to_case(Case::Snake)))
    }
    
    pub fn pascal_case(value: &Value, _: &HashMap<String, Value>) -> Result<Value> {
        let s = value.as_str().ok_or_else(|| {
            tera::Error::msg("pascal_case filter expects a string")
        })?;
        Ok(Value::String(s.to_case(Case::Pascal)))
    }
}
```

### 2.2 Template Context Builder

**src/templates/context.rs**:
```rust
use serde::Serialize;
use crate::core::config::ProjectConfig;

#[derive(Serialize)]
pub struct TemplateContext {
    pub project: ProjectData,
    pub dependencies: Dependencies,
    pub features: Features,
}

#[derive(Serialize)]
pub struct ProjectData {
    pub name: String,
    pub module_name: String,
    pub framework: String,
    pub has_database: bool,
    pub database: Option<String>,
}

#[derive(Serialize)]
pub struct Dependencies {
    pub framework: Vec<Dependency>,
    pub database: Vec<Dependency>,
    pub common: Vec<Dependency>,
    pub dev: Vec<Dependency>,
}

#[derive(Serialize)]
pub struct Dependency {
    pub name: String,
    pub version: String,
    pub features: Vec<String>,
}

#[derive(Serialize)]
pub struct Features {
    pub docker: bool,
    pub ci_cd: bool,
    pub graphql: bool,
    pub websocket: bool,
    pub telemetry: bool,
    pub frontend: Option<String>,
}

impl TemplateContext {
    pub fn from_config(config: &ProjectConfig) -> Self {
        let module_name = config.name.replace('-', "_");
        
        Self {
            project: ProjectData {
                name: config.name.clone(),
                module_name,
                framework: format!("{:?}", config.framework).to_lowercase(),
                has_database: config.database.is_some(),
                database: config.database.map(|db| format!("{:?}", db).to_lowercase()),
            },
            dependencies: Dependencies::for_config(config),
            features: Features::from_config(config),
        }
    }
}
```

## Phase 3: Framework Templates

### 3.1 Base Template Structure

**templates/base/Cargo.toml.tera**:
```toml
[package]
name = "{{ project.name }}"
version = "0.1.0"
edition = "2021"

[dependencies]
# Core dependencies
anyhow = "1.0"
tokio = { version = "1.35", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
config = "0.13"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

# Framework
{% for dep in dependencies.framework -%}
{{ dep.name }} = { version = "{{ dep.version }}"
{%- if dep.features %}, features = {{ dep.features | json_encode }} {% endif %} }
{% endfor %}

# Database
{% if project.has_database -%}
{% for dep in dependencies.database -%}
{{ dep.name }} = { version = "{{ dep.version }}"
{%- if dep.features %}, features = {{ dep.features | json_encode }} {% endif %} }
{% endfor %}
{%- endif %}

[dev-dependencies]
{% for dep in dependencies.dev -%}
{{ dep.name }} = "{{ dep.version }}"
{% endfor %}
```

### 3.2 Axum Framework Template

**templates/frameworks/axum/main.rs.tera**:
```rust
use anyhow::Result;
use axum::{
    routing::{get, post},
    Router,
    response::IntoResponse,
    http::StatusCode,
    Json,
};
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::{
    trace::TraceLayer,
    cors::CorsLayer,
};
use tracing::info;

mod config;
mod error;
{% if project.has_database -%}
mod db;
{%- endif %}
mod handlers;
mod middleware;

use crate::config::Config;
use crate::error::AppError;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();
    
    // Load configuration
    let config = Config::from_env()?;
    
    {% if project.has_database -%}
    // Initialize database
    let db_pool = db::create_pool(&config.database_url).await?;
    {%- endif %}
    
    // Build application
    let app = create_app(
        {%- if project.has_database %} db_pool {% endif -%}
    );
    
    // Start server
    let addr = SocketAddr::from(([0, 0, 0, 0], config.port));
    info!("Server listening on {}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    
    Ok(())
}

fn create_app(
    {%- if project.has_database %} db_pool: db::Pool {% endif -%}
) -> Router {
    Router::new()
        // Health check
        .route("/health", get(handlers::health_check))
        // API routes
        .nest("/api/v1", api_routes())
        // Middleware
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(CorsLayer::permissive())
        )
        {% if project.has_database -%}
        .with_state(AppState { db_pool })
        {%- endif %}
}

fn api_routes() -> Router {
    Router::new()
        .route("/hello", get(handlers::hello_world))
}

{% if project.has_database -%}
#[derive(Clone)]
struct AppState {
    db_pool: db::Pool,
}
{%- endif %}
```

### 3.3 Framework-Specific Handlers

**templates/frameworks/axum/handlers.rs.tera**:
```rust
use axum::{
    response::IntoResponse,
    Json,
    http::StatusCode,
};
use serde::{Deserialize, Serialize};

pub async fn health_check() -> impl IntoResponse {
    Json(serde_json::json!({
        "status": "healthy",
        "service": "{{ project.name }}",
        "version": env!("CARGO_PKG_VERSION"),
    }))
}

pub async fn hello_world() -> impl IntoResponse {
    Json(serde_json::json!({
        "message": "Hello from {{ project.name }}!",
        "framework": "{{ project.framework }}",
    }))
}
```

## Phase 4: Database Integration

### 4.1 SQLx Database Template

**templates/databases/sqlx/db.rs.tera**:
```rust
use sqlx::{Pool, {{ project.database | pascal_case }}};
use anyhow::Result;

pub type DbPool = Pool<{{ project.database | pascal_case }}>;

pub async fn create_pool(database_url: &str) -> Result<DbPool> {
    let pool = sqlx::{{ project.database }}::PoolOptions::new()
        .max_connections(100)
        .connect(database_url)
        .await?;
    
    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;
    
    Ok(pool)
}
```

### 4.2 Migration Template

**templates/databases/sqlx/migrations/001_initial.sql.tera**:
```sql
-- Create initial tables for {{ project.name }}

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Phase 5: Advanced Features

### 5.1 Docker Support

**templates/features/docker/Dockerfile.tera**:
```dockerfile
# Build stage
FROM rust:1.75-slim as builder

WORKDIR /app

# Install dependencies for building
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy manifests
COPY Cargo.toml Cargo.lock ./

# Build dependencies (this is cached as long as Cargo.toml doesn't change)
RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Copy source code
COPY . .

# Build application
RUN touch src/main.rs && \
    cargo build --release

# Runtime stage
FROM debian:bookworm-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from build stage
COPY --from=builder /app/target/release/{{ project.name }} /app/{{ project.name }}

# Create non-root user
RUN useradd -m -u 1001 appuser && \
    chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

ENV RUST_LOG=info

CMD ["./{{ project.name }}"]
```

### 5.2 GitHub Actions CI/CD

**templates/features/github-actions/ci.yml.tera**:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  CARGO_TERM_COLOR: always
  RUST_BACKTRACE: 1

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    
    {% if project.has_database and project.database == "postgres" -%}
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    {%- endif %}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          components: rustfmt, clippy
      
      - name: Cache dependencies
        uses: Swatinem/rust-cache@v2
      
      - name: Check formatting
        run: cargo fmt -- --check
      
      - name: Clippy
        run: cargo clippy -- -D warnings
      
      - name: Run tests
        run: cargo test --all-features
        {% if project.has_database -%}
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost/test_db
        {%- endif %}
      
      - name: Build
        run: cargo build --release

  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: rustsec/audit-check@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Phase 6: Interactive UI

### 6.1 Interactive Prompts

**Add dependencies**:
```bash
cargo add dialoguer
cargo add indicatif
cargo add console
```

**src/interactive/prompts.rs**:
```rust
use dialoguer::{theme::ColorfulTheme, Select, Input, MultiSelect, Confirm};
use console::style;
use crate::cli::args::{Framework, Database, Feature};
use anyhow::Result;

pub struct InteractivePrompt {
    theme: ColorfulTheme,
}

impl InteractivePrompt {
    pub fn new() -> Self {
        Self {
            theme: ColorfulTheme::default(),
        }
    }
    
    pub fn get_project_name(&self, default: Option<String>) -> Result<String> {
        let prompt = Input::<String>::with_theme(&self.theme)
            .with_prompt("Project name")
            .validate_with(|input: &String| -> Result<(), &str> {
                if input.is_empty() {
                    Err("Project name cannot be empty")
                } else if !is_valid_crate_name(input) {
                    Err("Invalid crate name")
                } else {
                    Ok(())
                }
            });
        
        if let Some(default) = default {
            prompt.default(default).interact_text()
        } else {
            prompt.interact_text()
        }
        .map_err(Into::into)
    }
    
    pub fn select_framework(&self) -> Result<Framework> {
        let frameworks = vec![
            ("Axum", "Modern, ergonomic web framework", Framework::Axum),
            ("Actix Web", "Powerful and extremely fast", Framework::ActixWeb),
            ("Rocket", "Type-safe and easy to use", Framework::Rocket),
            ("Warp", "Composable, fast web server", Framework::Warp),
            ("Tide", "Modular async web framework", Framework::Tide),
            ("Poem", "Full-featured web framework", Framework::Poem),
        ];
        
        let selection = Select::with_theme(&self.theme)
            .with_prompt("Select a web framework")
            .items(&frameworks.iter().map(|(name, desc, _)| {
                format!("{} - {}", style(name).bold(), desc)
            }).collect::<Vec<_>>())
            .default(0)
            .interact()?;
        
        Ok(frameworks[selection].2)
    }
    
    pub fn select_database(&self) -> Result<Option<Database>> {
        let databases = vec![
            ("PostgreSQL", "Advanced open source database", Some(Database::Postgres)),
            ("MySQL", "Popular open source database", Some(Database::Mysql)),
            ("SQLite", "Embedded database", Some(Database::Sqlite)),
            ("MongoDB", "Document database", Some(Database::Mongodb)),
            ("Redis", "In-memory data structure store", Some(Database::Redis)),
            ("ScyllaDB", "High-performance NoSQL database", Some(Database::Scylladb)),
            ("None", "No database", None),
        ];
        
        let selection = Select::with_theme(&self.theme)
            .with_prompt("Select a database (optional)")
            .items(&databases.iter().map(|(name, desc, _)| {
                format!("{} - {}", style(name).bold(), desc)
            }).collect::<Vec<_>>())
            .default(6)
            .interact()?;
        
        Ok(databases[selection].2)
    }
    
    pub fn select_features(&self) -> Result<Vec<Feature>> {
        let features = vec![
            ("Docker", "Container support", Feature::Docker),
            ("GitHub Actions", "CI/CD workflows", Feature::GithubActions),
            ("GraphQL", "GraphQL API support", Feature::Graphql),
            ("WebSocket", "Real-time communication", Feature::Websocket),
            ("Telemetry", "OpenTelemetry integration", Feature::Telemetry),
            ("HTMX", "HTML over the wire", Feature::Htmx),
            ("Leptos", "Full-stack Rust framework", Feature::Leptos),
            ("React", "React frontend setup", Feature::React),
            ("OpenAPI", "API documentation", Feature::OpenApi),
        ];
        
        let selections = MultiSelect::with_theme(&self.theme)
            .with_prompt("Select additional features (space to select, enter to confirm)")
            .items(&features.iter().map(|(name, desc, _)| {
                format!("{} - {}", style(name).bold(), desc)
            }).collect::<Vec<_>>())
            .interact()?;
        
        Ok(selections.into_iter()
            .map(|i| features[i].2)
            .collect())
    }
    
    pub fn confirm_git_init(&self) -> Result<bool> {
        Confirm::with_theme(&self.theme)
            .with_prompt("Initialize git repository?")
            .default(true)
            .interact()
            .map_err(Into::into)
    }
}

fn is_valid_crate_name(name: &str) -> bool {
    name.chars().all(|c| c.is_alphanumeric() || c == '_' || c == '-')
        && !name.starts_with(|c: char| c.is_numeric())
}
```

### 6.2 Progress Indicators

**src/interactive/progress.rs**:
```rust
use indicatif::{ProgressBar, ProgressStyle, MultiProgress};
use console::style;
use std::time::Duration;

pub struct ProgressReporter {
    multi: MultiProgress,
    main_bar: ProgressBar,
}

impl ProgressReporter {
    pub fn new(total_steps: u64) -> Self {
        let multi = MultiProgress::new();
        let main_bar = multi.add(ProgressBar::new(total_steps));
        
        main_bar.set_style(
            ProgressStyle::default_bar()
                .template("{spinner:.green} [{bar:40.cyan/blue}] {pos}/{len} {msg}")
                .unwrap()
                .progress_chars("#>-")
        );
        
        Self { multi, main_bar }
    }
    
    pub fn start_step(&self, message: &str) {
        self.main_bar.set_message(message.to_string());
        self.main_bar.inc(1);
    }
    
    pub fn sub_progress(&self, message: &str, total: u64) -> ProgressBar {
        let sub_bar = self.multi.add(ProgressBar::new(total));
        sub_bar.set_style(
            ProgressStyle::default_spinner()
                .template("  {spinner:.yellow} {msg}")
                .unwrap()
        );
        sub_bar.set_message(message.to_string());
        sub_bar
    }
    
    pub fn finish_with_message(&self, message: &str) {
        self.main_bar.finish_with_message(
            format!("{} {}", style("✓").green(), message)
        );
    }
}
```

## Phase 7: Testing & Quality

### 7.1 Integration Tests

**tests/integration/create_project.rs**:
```rust
use assert_cmd::Command;
use predicates::prelude::*;
use tempfile::TempDir;

#[test]
fn test_create_basic_project() {
    let temp_dir = TempDir::new().unwrap();
    let project_name = "test_project";
    
    let mut cmd = Command::cargo_bin("rust-blueprint").unwrap();
    cmd.current_dir(&temp_dir)
        .arg("create")
        .arg("--name")
        .arg(project_name)
        .arg("--framework")
        .arg("axum")
        .arg("--no-interactive");
    
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("Project created successfully"));
    
    // Verify project structure
    let project_dir = temp_dir.path().join(project_name);
    assert!(project_dir.join("Cargo.toml").exists());
    assert!(project_dir.join("src/main.rs").exists());
    assert!(project_dir.join(".gitignore").exists());
    
    // Verify the project compiles
    let mut cargo_check = Command::new("cargo");
    cargo_check.current_dir(&project_dir)
        .arg("check")
        .assert()
        .success();
}

#[test]
fn test_create_with_database() {
    let temp_dir = TempDir::new().unwrap();
    let project_name = "db_project";
    
    let mut cmd = Command::cargo_bin("rust-blueprint").unwrap();
    cmd.current_dir(&temp_dir)
        .arg("create")
        .arg("--name")
        .arg(project_name)
        .arg("--framework")
        .arg("axum")
        .arg("--database")
        .arg("postgres")
        .arg("--no-interactive");
    
    cmd.assert().success();
    
    let project_dir = temp_dir.path().join(project_name);
    assert!(project_dir.join("src/db.rs").exists());
    assert!(project_dir.join("migrations").exists());
    
    // Check Cargo.toml contains sqlx
    let cargo_toml = std::fs::read_to_string(project_dir.join("Cargo.toml")).unwrap();
    assert!(cargo_toml.contains("sqlx"));
}
```

### 7.2 Unit Tests

**src/utils/validation.rs with tests**:
```rust
pub fn validate_project_name(name: &str) -> Result<(), String> {
    if name.is_empty() {
        return Err("Project name cannot be empty".to_string());
    }
    
    if !name.chars().all(|c| c.is_alphanumeric() || c == '_' || c == '-') {
        return Err("Project name can only contain alphanumeric characters, underscores, and hyphens".to_string());
    }
    
    if name.starts_with(|c: char| c.is_numeric()) {
        return Err("Project name cannot start with a number".to_string());
    }
    
    if name.len() > 64 {
        return Err("Project name cannot exceed 64 characters".to_string());
    }
    
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_valid_project_names() {
        assert!(validate_project_name("my_project").is_ok());
        assert!(validate_project_name("my-project").is_ok());
        assert!(validate_project_name("MyProject123").is_ok());
        assert!(validate_project_name("a").is_ok());
    }
    
    #[test]
    fn test_invalid_project_names() {
        assert!(validate_project_name("").is_err());
        assert!(validate_project_name("123project").is_err());
        assert!(validate_project_name("my project").is_err());
        assert!(validate_project_name("my@project").is_err());
        assert!(validate_project_name(&"a".repeat(65)).is_err());
    }
}
```

## Phase 8: Documentation & Release

### 8.1 Documentation Structure

**docs/getting-started.md**:
```markdown
# Getting Started with Rust Blueprint

## Installation

```bash
cargo install rust-blueprint
```

## Quick Start

1. Create a new project interactively:
```bash
rust-blueprint create
```

2. Or use command-line flags:
```bash
rust-blueprint create --name my-api --framework axum --database postgres
```

## Project Structure

After generation, your project will have:

- `src/` - Source code
  - `main.rs` - Application entry point
  - `config.rs` - Configuration management
  - `handlers/` - Request handlers
  - `db/` - Database models and queries
- `tests/` - Integration tests
- `migrations/` - Database migrations
- `Cargo.toml` - Dependencies and metadata
```

### 8.2 Release Configuration

**.github/workflows/release.yml**:
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  create-release:
    name: Create Release
    runs-on: ubuntu-latest
    outputs:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
    steps:
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

  build-and-upload:
    name: Build and Upload
    needs: create-release
    strategy:
      matrix:
        include:
          - target: x86_64-unknown-linux-gnu
            os: ubuntu-latest
          - target: x86_64-apple-darwin
            os: macos-latest
          - target: x86_64-pc-windows-msvc
            os: windows-latest
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
        with:
          targets: ${{ matrix.target }}
      
      - name: Build
        run: cargo build --release --target ${{ matrix.target }}
      
      - name: Package
        shell: bash
        run: |
          if [ "${{ matrix.os }}" = "windows-latest" ]; then
            7z a rust-blueprint-${{ matrix.target }}.zip ./target/${{ matrix.target }}/release/rust-blueprint.exe
          else
            tar czvf rust-blueprint-${{ matrix.target }}.tar.gz -C target/${{ matrix.target }}/release rust-blueprint
          fi
      
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ needs.create-release.outputs.upload_url }}
          asset_path: rust-blueprint-${{ matrix.target }}.${{ matrix.os == 'windows-latest' && 'zip' || 'tar.gz' }}
          asset_name: rust-blueprint-${{ matrix.target }}.${{ matrix.os == 'windows-latest' && 'zip' || 'tar.gz' }}
          asset_content_type: application/octet-stream

  publish-crate:
    name: Publish to crates.io
    runs-on: ubuntu-latest
    needs: build-and-upload
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
      
      - name: Publish
        run: cargo publish
        env:
          CARGO_REGISTRY_TOKEN: ${{ secrets.CARGO_REGISTRY_TOKEN }}
```

### 8.3 Benchmarks

**benches/template_rendering.rs**:
```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};
use rust_blueprint::templates::{TemplateEngine, TemplateContext};
use rust_blueprint::core::config::{ProjectConfig, Framework};

fn benchmark_template_rendering(c: &mut Criterion) {
    let config = ProjectConfig::new("bench_project".to_string(), Framework::Axum);
    let context = TemplateContext::from_config(&config);
    
    c.bench_function("render cargo.toml", |b| {
        b.iter(|| {
            let engine = TemplateEngine::new()
                .with_context("project", &context.project)
                .with_context("dependencies", &context.dependencies);
            
            black_box(engine.render("base/Cargo.toml.tera").unwrap());
        });
    });
    
    c.bench_function("render main.rs", |b| {
        b.iter(|| {
            let engine = TemplateEngine::new()
                .with_context("project", &context.project);
            
            black_box(engine.render("frameworks/axum/main.rs.tera").unwrap());
        });
    });
}

criterion_group!(benches, benchmark_template_rendering);
criterion_main!(benches);
```

## Implementation Timeline

### Week 1-2: Foundation
- Set up project structure
- Implement basic CLI with clap
- Create core types and error handling
- Set up CI/CD pipeline

### Week 3-4: Template System
- Implement template engine wrapper
- Create base templates
- Add template context builders
- Write template rendering tests

### Week 5-6: Framework Support
- Implement Axum templates
- Add Actix Web templates
- Create framework-specific features
- Test generated projects

### Week 7-8: Database Integration
- Add SQLx templates
- Create migration system
- Implement database-specific features
- Add database tests

### Week 9-10: Advanced Features
- Add Docker support
- Create CI/CD templates
- Implement GraphQL/WebSocket features
- Add frontend integration

### Week 11-12: Polish & Release
- Implement interactive UI
- Add comprehensive documentation
- Create release automation
- Launch beta version

## Success Metrics

1. **Performance**: Project generation < 1 second
2. **Quality**: 100% of generated projects compile
3. **Testing**: >80% code coverage
4. **Documentation**: Complete API docs and guides
5. **Community**: 100+ stars in first month

## Next Steps

1. Create GitHub repository
2. Set up initial project structure
3. Implement Phase 1 (Core CLI)
4. Create first working prototype
5. Gather community feedback
6. Iterate and improve