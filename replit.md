# replit.md

## Overview

This is a full-stack web application for San Jose National High School built with React, Express, TypeScript, and PostgreSQL. The application serves as the school's official website featuring enrollment information, staff directories, school updates, and various educational resources. It uses a modern tech stack with shadcn/ui components for the frontend and Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 23, 2025)

- **Migration to Replit**: Successfully migrated project from Replit Agent to standard Replit environment with clean deployment structure
- **Dark/Light Mode Implementation**: Added complete theme toggle system with dark and light mode support to address eye strain concerns
- **Theme Provider Integration**: Implemented React context-based theme system with localStorage persistence and smooth transitions
- **Blue Theme Consistency**: Maintained blue color scheme for navigation and interactive elements across both light and dark modes
- **Soft Background Modes**: Light mode uses soft beige/pastel background, dark mode provides comfortable dark gray themes
- **Theme Toggle Button**: Added sun/moon toggle button in both desktop and mobile navigation for easy theme switching
- **GitHub Pages Removal**: Removed all GitHub Pages-specific configurations and build outputs to prepare for standard web hosting
- **Accessibility Compliance**: Both themes maintain proper contrast ratios and readability standards

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom school-themed color variables
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix routing
- **Middleware**: Custom logging middleware for API requests
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Connection**: Neon Database serverless driver for cloud deployment
- **Migrations**: Drizzle Kit for schema migrations
- **Development Storage**: In-memory storage implementation for development

### Authentication and Authorization
- **Current State**: Basic user schema defined with username/password fields
- **Session Management**: Express session support with PostgreSQL store (connect-pg-simple)
- **Validation**: Zod schemas for input validation

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with id, username, and password fields
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Type Safety**: Drizzle-zod integration for runtime validation

### Frontend Components
- **Page Components**: Home page with multiple sections (Hero with background image, Updates, Enrollment, Staff, Gallery)
- **UI Components**: Complete shadcn/ui component library including forms, dialogs, cards, etc.
- **Layout Components**: Navigation with hamburger menu and FAQ link, Footer with contact information
- **School-Specific Components**: Enrollment forms, staff directory, learning modality information
- **Privacy Features**: All real names replaced with "SECRET NAME", positions with "POSITION", and photos with placeholder images

### Backend Services
- **Storage Interface**: Abstract storage interface with memory-based implementation
- **Route Registration**: Modular route registration system
- **Development Server**: Vite integration for hot module replacement in development

## Data Flow

1. **Client Requests**: React frontend makes API calls to Express backend
2. **API Processing**: Express routes handle requests with proper error handling and logging
3. **Data Layer**: Storage interface abstracts database operations using Drizzle ORM
4. **Response**: JSON responses with consistent error handling and status codes
5. **Client Updates**: TanStack Query manages caching and state synchronization

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless)
- **UI Framework**: Radix UI primitives for accessible components
- **Validation**: Zod for schema validation and type inference
- **Build Tools**: Vite with React plugin and TypeScript support

### Development Tools
- **Hot Reload**: Vite HMR with Express middleware integration
- **Error Handling**: Runtime error overlay for development
- **Code Quality**: TypeScript strict mode with comprehensive type checking

### School-Specific Integrations
- **External Links**: Direct links to grade-specific enrollment forms
- **Contact System**: Phone and text-based enrollment support
- **Content Management**: Static content with placeholder for dynamic updates

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public` directory
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Assets**: Static assets served from build output

### Environment Configuration
- **Development**: Local server with Vite middleware and hot reload
- **Production**: Express serves static files and API routes
- **Database**: Environment variable-based connection string

### Scalability Considerations
- **Database**: Serverless PostgreSQL through Neon for automatic scaling
- **Session Storage**: PostgreSQL-backed sessions for horizontal scaling
- **Static Assets**: Built for CDN deployment if needed

### Monitoring and Logging
- **API Logging**: Custom middleware logs all API requests with timing
- **Error Tracking**: Centralized error handling with proper status codes
- **Development Tools**: Replit-specific development banner and debugging tools