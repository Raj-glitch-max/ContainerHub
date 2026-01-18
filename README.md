# ContainerHub

A modern, minimalist coding practice platform built with containerized code execution. Practice algorithms and data structures with real-time feedback on 48+ curated problems.

## Features

- **Real Code Execution**: Submit code that runs in isolated Docker containers via Piston API
- **48 Quality Problems**: Curated problems across Arrays, Strings, Trees, Dynamic Programming, Graphs, and more
- **Topic-Based Filtering**: Browse problems by category or difficulty level
- **User Authentication**: Secure JWT-based authentication with email verification
- **Progress Tracking**: Track solved problems, acceptance rates, and maintain daily streaks
- **Leaderboard**: Compete with other developers and track your ranking
- **Modern UI**: Clean, minimalist black and white design inspired by modern web aesthetics
- **No Ads, No Distractions**: Pure focus on learning and problem-solving

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Knex.js migrations
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email**: SendGrid integration for verification emails
- **Code Execution**: Piston API for containerized code running

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Router**: React Router v6
- **Code Editor**: Monaco Editor (VS Code engine)
- **HTTP Client**: Axios

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes manifests included
- **Reverse Proxy**: Nginx for production frontend
- **CI/CD**: Jenkins pipeline configuration

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker (optional)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Raj-glitch-max/ContainerHub.git
cd ContainerHub
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:migrate
npm run db:seed
npm run dev
```

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Docker Deployment

```bash
# Pull pre-built images from DockerHub
docker pull rajglitchmax/containerhub-backend:latest
docker pull rajglitchmax/containerhub-frontend:latest

# Or use docker-compose
cp .env.prod.example .env.prod
docker-compose -f docker-compose.prod.yml up -d
docker exec containerhub-backend npm run db:migrate
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/containerhub
JWT_SECRET=your-secret-key
SENDGRID_API_KEY=your-sendgrid-key (optional)
FROM_EMAIL=noreply@containerhub.com
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

## Project Structure

```
ContainerHub/
├── backend/
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Auth & validation
│   │   └── database/        # Migrations & seeds
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # Reusable components
│   │   └── contexts/        # React contexts
│   └── Dockerfile
├── k8s/                     # Kubernetes manifests
└── docker-compose.yml
```

## API Documentation

### Authentication
- `POST /api/v1/auth/register` - Create new account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/verify-email` - Verify email
- `POST /api/v1/auth/forgot-password` - Request password reset

### Problems
- `GET /api/v1/problems` - List all problems
- `GET /api/v1/problems/:slug` - Get problem details

### Submissions
- `POST /api/v1/submissions` - Submit code for execution
- `GET /api/v1/submissions/:id` - Get submission result

### Stats
- `GET /api/v1/stats/me` - Get user statistics
- `GET /api/v1/stats/leaderboard` - Get top users

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
```

### Database Migrations
```bash
cd backend
npm run db:migrate          # Run migrations
npm run db:rollback         # Rollback last migration
npm run db:seed             # Seed database
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Deployment

### Docker Images
Pre-built images are available on DockerHub:
- Backend: `rajglitchmax/containerhub-backend:latest`
- Frontend: `rajglitchmax/containerhub-frontend:latest`

### Kubernetes
Apply the manifests in the `k8s/` directory:
```bash
kubectl apply -f k8s/
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Code execution powered by [Piston API](https://github.com/engineer-man/piston)
- Problem inspiration from various competitive programming platforms
- UI design influenced by modern minimalist web design principles

## Support

- **Issues**: [GitHub Issues](https://github.com/Raj-glitch-max/ContainerHub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Raj-glitch-max/ContainerHub/discussions)

## Roadmap

- [ ] C++ and Python 3 support
- [ ] Submission history and code versioning
- [ ] Problem difficulty prediction
- [ ] Company-specific problem tags
- [ ] Discussion forums per problem
- [ ] Video solution explanations

---

**Built with ❤️ by developers, for developers**
