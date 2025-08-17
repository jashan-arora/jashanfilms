# Jashan Films - Punjabi Music Production Website

## Overview

This is a serverless web application for Jashan Films, a Punjabi music production company that broadcasts content on Doordarshan. The application uses Firebase as a complete backend-as-a-service, providing authentication, database, and hosting in a fully serverless architecture. It serves as both a public-facing website showcasing their services and music gallery, and an admin dashboard for managing content and contact submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application is now a fully serverless client-side application:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Serverless Firebase (Firestore + Authentication)
- **Database**: Firebase Firestore (NoSQL document database)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **UI Library**: shadcn/ui components built on Radix UI
- **Styling**: Tailwind CSS with custom Punjabi theme colors
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: TanStack Query with custom fetch wrapper

### Backend Architecture (Serverless)
- **Runtime**: Client-side only (no server required)
- **Authentication**: Firebase Auth with Google OAuth
- **Database**: Firebase Firestore (NoSQL document database)
- **Admin System**: Secure Firestore-based role management with security rules
- **API Design**: Direct Firebase SDK calls from client
- **Real-time**: Firebase Firestore real-time listeners
- **Security**: Firebase security rules enforce admin permissions

### Database Schema
The application uses Firebase Firestore with the following main collections:
- **admins**: Secure admin role management with Firebase UIDs
- **songs**: Music gallery management with YouTube integration
- **contacts**: Contact form submissions with read status tracking
- **company**: Editable company information and statistics

### UI Component System
- **Design System**: shadcn/ui with "new-york" style variant
- **Theme**: Custom Punjabi color palette (orange, red, gold, cream)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Components**: Reusable UI components with consistent styling

## Data Flow

### Public User Flow
1. Users visit the website and view company information
2. Browse the music gallery with YouTube video integration
3. Submit contact forms for services (song submission, advertisement, TV production)
4. All data flows through REST API endpoints to the database

### Admin User Flow
1. Admin logs in through dedicated admin portal
2. Manages songs in the gallery (add, edit, delete)
3. Reviews and manages contact submissions
4. Updates company information and statistics
5. All admin actions are authenticated and use the same REST API

### API Structure
- **Public Endpoints**: `/api/songs`, `/api/contact`, `/api/company-info`
- **Admin Endpoints**: `/api/admin/login`, `/api/contact-submissions`
- **CRUD Operations**: Full create, read, update, delete operations for songs
- **Data Validation**: Zod schemas shared between client and server

## External Dependencies

### Core Dependencies
- **firebase**: Firebase SDK for authentication and Firestore database
- **@tanstack/react-query**: Client state management and caching
- **react-hook-form & @hookform/resolvers**: Form handling and validation
- **zod**: Schema validation for forms and data

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Variant-based component styling

### Development Dependencies
- **typescript**: Type safety across the entire application
- **vite**: Fast build tool with HMR for development

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR for client-side development
- **Database**: Firebase Firestore with real-time listeners
- **Authentication**: Firebase Auth with Google OAuth
- **Environment**: Firebase configuration through environment variables

### Production Build
- **Frontend**: Vite builds static assets for deployment
- **Backend**: Serverless Firebase functions (if needed)
- **Database**: Production Firebase Firestore
- **Deployment**: Static hosting with Firebase services

### Configuration Management
- **Firebase**: Environment variables for API keys and project configuration
- **Build Process**: Single Vite build process for static assets
- **Authentication**: Firebase handles all user authentication and sessions
- **Security**: Firestore security rules enforce data access permissions

The architecture is fully serverless and scales automatically with Firebase services, requiring minimal configuration and no server management.