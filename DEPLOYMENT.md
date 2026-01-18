# 🚀 ContainerHub Deployment Guide

## Quick Deploy with Docker Compose (Production)

### Prerequisites
- Docker and Docker Compose installed
- Port 3000 (frontend) and 3001 (backend) available

### Step 1: Clone & Setup
```bash
git clone https://github.com/Raj-glitch-max/ContainerHub.git
cd ContainerHub
```

### Step 2: Configure Environment
```bash
# Copy production environment template
cp .env.prod.example .env.prod

# Edit with your secure values
nano .env.prod

# Generate a secure JWT secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Deploy
```bash
# Pull latest images from DockerHub
docker-compose -f docker-compose.prod.yml pull

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### Step 4: Initialize Database
```bash
# Run migrations (first time only)
docker exec containerhub-backend npm run db:migrate

# Seed sample problems (optional)
docker exec containerhub-backend npm run db:seed
```

### Step 5: Access Platform
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

---

## Management Commands

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

### Stop Services
```bash
docker-compose -f docker-compose.prod.yml down

# Stop and remove volumes (WARNING: deletes data)
docker-compose -f docker-compose.prod.yml down -v
```

### Update to Latest Version
```bash
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Database Backup
```bash
docker exec containerhub-postgres pg_dump -U postgres containerhub > backup.sql
```

### Database Restore
```bash
docker exec -i containerhub-postgres psql -U postgres containerhub < backup.sql
```

---

## Deployment to Cloud Platforms

### AWS EC2 / DigitalOcean / Linode
1. Launch instance (Ubuntu 20.04+)
2. Install Docker & Docker Compose
3. Clone repository
4. Follow Quick Deploy steps above
5. Configure reverse proxy (Nginx/Caddy) for HTTPS

### Render.com (Free Tier)
1. Create new Web Service for backend
2. Use DockerHub image: `rajglitchmax/containerhub-backend:latest`
3. Add PostgreSQL database addon
4. Set environment variables
5. Deploy frontend separately using `rajglitchmax/containerhub-frontend:latest`

### Railway.app (Free Tier)
1. Create new project
2. Add PostgreSQL service
3. Add Redis service
4. Deploy backend from DockerHub
5. Deploy frontend from DockerHub
6. Configure environment variables

---

## Environment Variables Reference

### Required
- `POSTGRES_PASSWORD` - Database password
- `JWT_SECRET` - Secret key for JWT tokens (32+ characters)

### Optional
- `JWT_EXPIRY` - Access token expiry (default: 15m)
- `REFRESH_TOKEN_EXPIRY` - Refresh token expiry (default: 7d)
- `BCRYPT_ROUNDS` - Password hashing rounds (default: 10, recommended: 12 for production)

---

## Troubleshooting

### Backend won't start
```bash
# Check logs
docker logs containerhub-backend

# Common issues:
# - Database not ready: Wait 30 seconds and retry
# - Migration needed: Run npm run db:migrate
```

### Frontend shows connection error
```bash
# Verify backend is running
curl http://localhost:3001/health

# Check environment variables
docker inspect containerhub-frontend
```

### Database connection issues
```bash
# Test database
docker exec containerhub-postgres psql -U postgres -c "SELECT 1"

# Check network
docker network inspect containerhub_network
```

---

## Production Checklist

- [ ] Change `JWT_SECRET` to a secure random value
- [ ] Update `POSTGRES_PASSWORD` to a strong password
- [ ] Set `BCRYPT_ROUNDS` to 12 or higher
- [ ] Configure HTTPS with SSL certificate
- [ ] Set up automated database backups
- [ ] Configure monitoring (Grafana, Prometheus)
- [ ] Set up logging aggregation
- [ ] Configure firewall rules
- [ ] Enable fail2ban or similar protection
- [ ] Set up health check monitoring
- [ ] Configure auto-restart policies
- [ ] Document disaster recovery plan

---

## Support

For issues or questions:
- GitHub: https://github.com/Raj-glitch-max/ContainerHub
- Issues: https://github.com/Raj-glitch-max/ContainerHub/issues
