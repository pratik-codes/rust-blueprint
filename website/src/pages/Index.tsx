
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is already set
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const frameworks = [
    { name: "AXUM", description: "Ergonomic and modular web framework", status: "STABLE" },
    { name: "ACTIX WEB", description: "Powerful, pragmatic, and extremely fast", status: "STABLE" },
    { name: "ROCKET", description: "Type-safe web framework with focus on usability", status: "STABLE" },
    { name: "WARP", description: "Composable, fast web server framework", status: "STABLE" },
    { name: "TIDE", description: "Modular web framework built on async-std", status: "BETA" },
    { name: "POEM", description: "Full-featured and easy-to-use web framework", status: "BETA" },
  ];

  const databases = [
    { name: "POSTGRESQL", driver: "SQLx, Diesel, SeaORM", migration: "YES" },
    { name: "MYSQL/MARIADB", driver: "SQLx, Diesel, SeaORM", migration: "YES" },
    { name: "SQLITE", driver: "SQLx, Diesel, SeaORM", migration: "YES" },
    { name: "MONGODB", driver: "Official Driver", migration: "YES" },
    { name: "REDIS", driver: "redis-rs", migration: "N/A" },
    { name: "SCYLLADB", driver: "scylla-rust-driver", migration: "YES" },
  ];

  const features = [
    "DOCKER - Multi-stage Dockerfile optimized for Rust",
    "CI/CD - GitHub Actions, GitLab CI, or Jenkins",
    "GRAPHQL - Async-graphql or Juniper integration",
    "WEBSOCKET - Real-time communication support",
    "TELEMETRY - OpenTelemetry and structured logging",
    "FRONTEND - HTMX, Leptos, or React/Vue.js integration",
    "API DOCS - OpenAPI/Swagger documentation",
    "TESTING - Unit, integration, and E2E test setup",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono crt-screen">
      {/* Header */}
      <header className="py-3 px-6">
        <div className="max-w-7xl mx-auto lg:max-w-[60%] flex justify-between items-center my-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-sm font-medium tracking-wider">🦀 RUST BLUEPRINT</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="text-sm font-medium tracking-wider text-primary hover:underline transition-all duration-200"
          >
            {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto lg:max-w-[60%] px-6 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-12 py-20">
          {/* ASCII Blueprint Art
          <div className="hidden md:block mb-8">
            <pre className="text-xs text-primary/50 leading-tight select-none">
{`    ╔═══════════════════════════════════════════════════════════════╗
    ║                      RUST PROJECT BLUEPRINT                   ║
    ╠═══════════════════════════════════════════════════════════════╣
    ║  ┌─────────┐     ┌──────────┐     ┌─────────┐                ║
    ║  │   SRC   │────▶│   LIBS   │────▶│  BUILD  │                ║
    ║  └─────────┘     └──────────┘     └─────────┘                ║
    ║       │               │                 │                     ║
    ║       └───────────────┴─────────────────┘                     ║
    ║                         │                                     ║
    ║                    [ DEPLOY ]                                 ║
    ╚═══════════════════════════════════════════════════════════════╝`}
            </pre>
          </div> */}

          {/* Main Title with Animation Effect */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                {/* <span className="text-[12rem] font-bold">🦀</span> */}
              </div>
              <span className="inline-flex items-center px-3 py-1 text-xs font-light tracking-wider text-primary/70 border border-primary/30 bg-primary/5 animate-pulse mb-2">
                COMING SOON
              </span>
              <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] text-primary mb-4 relative z-10">
                RUST
              </h1>
              <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] text-primary relative z-10">
                BLUEPRINT
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-px bg-primary animate-pulse"></div>
              </h1>
            </div>
            
            <div className="space-y-4 mt-8">
              <div className="inline-block">
                <p className="text-xl md:text-2xl tracking-wider text-muted-foreground font-extralight">
                  BLAZINGLY FAST PROJECT SCAFFOLDING
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-3"></div>
              </div>
              <p className="text-base md:text-lg tracking-[0.15em] text-muted-foreground font-light">
                FOR RUSTACEANS
              </p>
            </div>
          </div>

          {/* Terminal Preview with Creative Layout */}
          <div className="relative max-w-3xl mx-auto">
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="h-full w-full" style={{
                backgroundImage: `repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent 20px),
                                 repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 1px, transparent 20px)`
              }}></div>
            </div>

            {/* Terminal Window */}
            <div className="relative bg-background border border-primary/30 rounded-sm shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-primary/10 border-b border-primary/30 px-4 py-2 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <span className="text-xs text-muted-foreground">rust-blueprint@terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 space-y-3 font-mono text-sm">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">➜</span>
                  <span className="text-primary">cargo install rust-blueprint</span>
                  <span className="animate-pulse ml-1">_</span>
                </div>
                <div className="text-muted-foreground pl-4">
                  <div>📦 Installing rust-blueprint v1.0.0...</div>
                  <div>🔧 Building dependencies...</div>
                  <div>✅ Successfully installed!</div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">➜</span>
                  <span className="text-primary">rust-blueprint create</span>
                </div>
                <div className="text-muted-foreground pl-4 space-y-1">
                  <div>🦀 Welcome to Rust Blueprint!</div>
                  <div>📝 Project name: <span className="text-primary">my-awesome-api</span></div>
                  <div>🚀 Framework: <span className="text-primary">axum</span></div>
                  <div>🗄️  Database: <span className="text-primary">postgres</span></div>
                  <div>✨ Creating your project...</div>
                  <div className="text-green-400">✅ Done! Your blazingly fast Rust project is ready!</div>
                </div>
              </div>
            </div>

            {/* Side Decorations */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-primary/20 text-6xl">
              {"{"}
            </div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-primary/20 text-6xl">
              {"}"}
            </div>
          </div>

          {/* Feature Highlights - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group cursor-pointer">
              <div className="bg-primary/5 border border-primary/20 p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
                <h3 className="text-sm font-light tracking-[0.15em] text-primary mb-2">&lt;10 SECONDS</h3>
                <p className="text-xs text-muted-foreground font-extralight">From zero to running server</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-primary/5 border border-primary/20 p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🔧</div>
                <h3 className="text-sm font-light tracking-[0.15em] text-primary mb-2">6+ FRAMEWORKS</h3>
                <p className="text-xs text-muted-foreground font-extralight">Pick your favorite stack</p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-primary/5 border border-primary/20 p-6 transition-all duration-300 group-hover:border-primary/50 group-hover:bg-primary/10">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
                <h3 className="text-sm font-light tracking-[0.15em] text-primary mb-2">SHIP TODAY</h3>
                <p className="text-xs text-muted-foreground font-extralight">Production-ready from start</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <div className="text-primary font-mono text-sm font-light">
              <span className="animate-pulse opacity-70">▶</span> START BUILDING
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button className="bg-primary text-primary-foreground px-8 py-3 font-light tracking-wider hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95">
                INSTALL NOW
              </button>
              <button className="border border-primary/50 text-primary px-8 py-3 font-light tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">
                VIEW DOCS
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted-foreground mb-6">
            🎯 WHY RUST BLUEPRINT?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">⚡ LIGHTNING FAST SETUP</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generate a complete project structure in under 10 seconds</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">🔧 FRAMEWORK FLEXIBILITY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Choose from popular Rust web frameworks</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">🗄️ DATABASE READY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Pre-configured database connections and migrations</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">🎨 MODERN TOOLING</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Includes hot-reloading, formatting, and linting out of the box</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">🐳 PRODUCTION READY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Docker, CI/CD, and deployment configurations included</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">🦾 TYPE SAFETY</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Leverage Rust's powerful type system from day one</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Installation */}
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted-foreground mb-6">
            📦 INSTALLATION
          </h2>
          
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">CARGO INSTALL:</p>
                  <code className="block bg-muted p-3 text-sm font-mono">cargo install rust-blueprint</code>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">FROM SOURCE:</p>
                  <code className="block bg-muted p-3 text-sm font-mono">
                    git clone https://github.com/rust-blueprint/rust-blueprint<br/>
                    cd rust-blueprint<br/>
                    cargo install --path .
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted-foreground mb-6">
            🎮 QUICK START
          </h2>
          
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">INTERACTIVE MODE (RECOMMENDED)</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="block bg-muted p-3 text-sm font-mono">rust-blueprint create</code>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">COMMAND LINE MODE</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="block bg-muted p-3 text-sm font-mono">
                  rust-blueprint create --name my-awesome-api --framework axum --database postgres
                </code>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wider">WITH ADVANCED FEATURES</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="block bg-muted p-3 text-sm font-mono">
                  rust-blueprint create --name my-app --framework axum --database postgres --features docker,github-actions
                </code>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supported Technologies */}
        <section>
          <h2 className="text-xs font-medium tracking-widest text-muted-foreground mb-6">
            🛠️ SUPPORTED TECHNOLOGIES
          </h2>

          {/* Web Frameworks */}
          <div className="mb-8">
            <h3 className="text-sm font-medium tracking-wider mb-4">WEB FRAMEWORKS</h3>
            <div className="space-y-1">
              {frameworks.map((framework) => (
                <div
                  key={framework.name}
                  className="grid grid-cols-12 gap-4 py-2 px-2 text-sm hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="col-span-3 font-medium">
                    {framework.name}
                  </div>
                  <div className="col-span-7 text-muted-foreground">
                    {framework.description}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-xs px-2 py-1 ${
                      framework.status === 'STABLE' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {framework.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="mb-8">
            <h3 className="text-sm font-medium tracking-wider mb-4">DATABASES</h3>
            <div className="space-y-1">
              {databases.map((database) => (
                <div
                  key={database.name}
                  className="grid grid-cols-12 gap-4 py-2 px-2 text-sm hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="col-span-3 font-medium">
                    {database.name}
                  </div>
                  <div className="col-span-6 text-muted-foreground">
                    {database.driver}
                  </div>
                  <div className="col-span-3 text-right text-muted-foreground">
                    MIGRATION: {database.migration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <h3 className="text-sm font-medium tracking-wider mb-4">ADVANCED FEATURES</h3>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="py-2 px-2 text-sm hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="text-muted-foreground">
                    {feature}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto lg:max-w-[60%] px-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground tracking-wider">
              RUST BLUEPRINT - OPEN SOURCE PROJECT SCAFFOLDING TOOL
            </p>
            <div className="flex justify-center space-x-8 text-xs text-muted-foreground">
              <span className="hover:text-primary cursor-pointer transition-colors">GITHUB</span>
              <span className="hover:text-primary cursor-pointer transition-colors">DOCUMENTATION</span>
              <span className="hover:text-primary cursor-pointer transition-colors">COMMUNITY</span>
              <span className="hover:text-primary cursor-pointer transition-colors">CONTRIBUTE</span>
            </div>
            <p className="text-xs text-muted-foreground">
              MADE WITH 🦀 BY THE RUST COMMUNITY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
