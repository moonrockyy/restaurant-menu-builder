# 🍽 MenuCraft - Restaurant Menu Builder

A modern, professional menu builder designed specifically for restaurants, cafes, bars, and food service businesses. Create beautiful, digital menus that your customers can access instantly on their phones. No design skills required!

![MenuCraft](https://img.shields.io/badge/MenuCraft-v1.0.0-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Professional Templates**
- **Restaurant Menus**: Clean layouts for fine dining and casual restaurants
- **Cafe Menus**: Warm designs perfect for coffee shops and bakeries
- **Custom Style**: Personalize colors and fonts to match your brand
- **Apple-Inspired Design**: Modern, clean aesthetics that customers love

### 🛠️ **Powerful Builder**
- **Drag & Drop Interface**: Intuitive menu item management
- **Custom Categories**: Create your own menu sections
- **Background Customization**: Upload custom images or use template backgrounds
- **Real-time Preview**: See changes instantly as you build
- **Mobile-Responsive**: Looks perfect on all devices

### 🚀 **Smart Features**
- **Shareable Links**: Generate unique URLs for your menus
- **Offline Access**: Customers can save menus to their home screen
- **Custom Backgrounds**: Upload your own images with advanced settings
- **Multiple Menus**: Manage different menus for different occasions
- **Auto-Save**: Never lose your work

### 🔐 **Authentication & Security**
- **Secure Login**: Email/password and Google OAuth support
- **Persistent Sessions**: Stay logged in across browser sessions
- **Protected Routes**: Secure dashboard and menu management
- **User Profiles**: Personalized experience with business information

### 📱 **Mobile-First Design**
- **Responsive Layout**: Perfect on phones, tablets, and desktops
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized performance for all devices
- **PWA Ready**: Install as a mobile app

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd restaurant-menu-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Card, etc.)
│   │   └── figma/        # Figma-specific components
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── pages/             # Page components
│   │   ├── Landing.tsx     # Homepage
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── MenuBuilder.tsx  # Main menu editor
│   │   ├── MenuView.tsx    # Public menu display
│   │   └── ...
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── styles/               # Global styles and CSS
└── supabase/            # Backend functions
```

## 🎯 Core Functionality

### Menu Building Process

1. **Template Selection**: Choose from professional templates
2. **Business Information**: Add restaurant details and branding
3. **Menu Items**: Add dishes with descriptions and prices
4. **Customization**: Adjust colors, fonts, and backgrounds
5. **Preview**: Real-time preview of your menu
6. **Publish**: Generate shareable link instantly

### Menu Management

- **Create**: Build new menus from scratch or templates
- **Edit**: Modify existing menus with instant updates
- **Duplicate**: Copy menus for different locations or occasions
- **Delete**: Remove unwanted menus safely
- **Organize**: Sort and filter your menu collection

### Background Customization

- **Template Backgrounds**: Professional pre-designed backgrounds
- **Custom Images**: Upload your own photos and graphics
- **Advanced Settings**: 
  - Opacity control
  - Size and position options
  - Blur and brightness adjustments
  - Multiple positioning modes

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1**: Modern, component-based UI
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS 4.1.12**: Utility-first styling
- **React Router 7.13.0**: Client-side routing
- **Framer Motion**: Smooth animations and transitions

### UI Components
- **Radix UI**: Accessible, unstyled components
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **React Hook Form**: Form management

### Backend & Database
- **Supabase**: 
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication service
  - File storage
  - Edge functions

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **TypeScript**: Static type checking

## 📱 Pages & Routes

### Public Pages
- **Landing**: Homepage with feature showcase
- **About**: Company information and story
- **Contribute**: Open source contribution guide
- **Menu View**: Public menu display for customers

### Protected Pages (Authentication Required)
- **Dashboard**: Overview of all menus and statistics
- **Menu Builder**: Main menu creation and editing interface
- **My Menus**: List and manage all created menus

### Authentication
- **Login**: Email/password and Google OAuth
- **Signup**: New user registration
- **Password Reset**: Secure password recovery

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build will be output to the `dist/` directory.

### Environment Variables

Ensure these are set in production:

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🤝 Contributing

We welcome contributions! Please see our [Contribution Guide](./src/app/pages/Contribute.tsx) for details.

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Write meaningful commit messages
- Test your changes thoroughly
- Keep components small and focused

## 🙏 Acknowledgments

- **Supabase**: For the amazing backend-as-a-service platform
- **Radix UI**: For accessible, unstyled components
- **Tailwind CSS**: For the utility-first CSS framework
- **Figma**: For the original design inspiration
- **React Community**: For the amazing ecosystem