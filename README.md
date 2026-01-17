# 🚀 ContainerHub - Collaborative Code Interview Platform

A production-grade platform for practicing coding interviews with real-time collaboration, AI-powered code reviews, and comprehensive tracking.

[![CI/CD](https://github.com/yourname/containerhub/actions/workflows/ci.yml/badge.svg)](https://github.com/yourname/containerhub/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🎯 **What is ContainerHub?**

ContainerHub solves the problem of **solo coding practice** by providing:

✅ **Real-time Collaboration** - Practice problems with peers  
✅ **AI Code Reviews** - Get instant feedback from Claude AI  
✅ **Problem Library** - LeetCode-style coding challenges  
✅ **Progress Tracking** - Analytics, leaderboards, streaks  
✅ **Multi-Language Support** - Python, JavaScript, Java  

---

## 🏗️ **Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React 18)                      │
│                  Hosted on: Vercel (Free)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend API (Node.js/Express)               │
│                  Hosted on: Render (Free)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │PostgreSQL│      │  Redis  │      │ Claude  │
    │(Supabase)│      │(Upstash)│      │   API   │
    └──────────┘      └─────────┘      └─────────┘
```

---

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **React Query** for server state
- **Socket.io** for real-time collaboration

### **Backend**
- **Node.js 18** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Knex migrations
- **Redis** for caching & sessions
- **JWT** authentication

### **Infrastructure**
- **Docker** & Docker Compose
- **Kubernetes** manifests (Minikube/Cloud)
- **GitHub Actions** CI/CD
- **Prometheus** & Grafana monitoring

### **External Services**
- **Claude API** - AI code reviews
- **SendGrid** - Email verification
- **GitHub OAuth** - Social login

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- Docker & Docker Compose
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/yourname/containerhub.git
cd containerhub
```

### **2. Setup Environment Variables**
```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env and add your API keys

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env
```

### **3. Start Local Development**
```bash
# Start PostgreSQL + Redis with Docker Compose
docker-compose up -d

# Install dependencies (backend)
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev

# Install dependencies (frontend)
cd ../frontend
npm install
npm run dev
```

### **4. Access Application**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health:** http://localhost:3001/health

---

## 📦 **Project Structure**

```
ContainerHub/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── database/     # Migrations & seeds
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic (Claude, email)
│   │   ├── middleware/   # Auth, error handling
│   │   └── server.ts     # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/             # React application
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.tsx       # Main app
│   ├── Dockerfile
│   └── package.json
│
├── infrastructure/       # DevOps configs
│   ├── k8s/              # Kubernetes manifests
│   ├── docker-compose.yml
│   └── scripts/
│
├── .github/
│   └── workflows/        # CI/CD pipelines
│       ├── ci.yml
│       └── deploy-staging.yml
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## 🧪 **Testing**

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

---

## 🔒 **Security**

- ✅ All passwords hashed with `bcrypt`
- ✅ JWT tokens with 15-minute expiry
- ✅ Rate limiting (100 req/min per user)
- ✅ Input validation with `Joi`
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (React auto-escaping)
- ✅ HTTPS in production
- ✅ Environment variables for secrets

---

## 📊 **Monitoring**

- **Prometheus** - Metrics collection
- **Grafana** - Dashboards & visualization
- **Sentry** - Error tracking (production)

### **Key Metrics**
- Request rate (requests/sec)
- Response time (p50, p95, p99)
- Error rate
- Active users
- Database connections

---

## 🚢 **Deployment**

### **Staging Environment**
```bash
# Automatic deployment on push to 'staging' branch
git push origin staging

# Staging URLs:
# Frontend: https://containerhub-staging.vercel.app
# Backend:  https://api-staging.containerhub.render.com
```

### **Production Environment**
```bash
# Automatic deployment on push to 'main' branch
git push origin main

# Production URLs:
# Frontend: https://containerhub.app
# Backend:  https://api.containerhub.app
```

---

## 📝 **API Documentation**

API documentation is available at:
- **Development:** http://localhost:3001/api-docs
- **Staging:** https://api-staging.containerhub.render.com/api-docs
- **Production:** https://api.containerhub.app/api-docs

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📜 **License**

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👤 **Author**

**Raj**  
- GitHub: [@yourhandle](https://github.com/yourhandle)  
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 **Acknowledgments**

- Inspired by LeetCode, HackerRank, and Interview.io
- Built with best practices from Production SaaS Rules
- UI/UX references from shadcn/ui

---

## 📞 **Support**

For issues or questions:
- Open an issue: [GitHub Issues](https://github.com/yourname/containerhub/issues)
- Email: support@containerhub.app

---

**Made with ❤️ for developers preparing for coding interviews**
