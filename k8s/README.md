# ════════════════════════════════════════════════════════════════
# Kubernetes Deployment Guide
# ════════════════════════════════════════════════════════════════

## Prerequisites

1. **Kubernetes Cluster** (any of the following):
   - Minikube (local development)
   - Kind (local development)
   - GKE (Google Kubernetes Engine)
   - EKS (Amazon Elastic Kubernetes Service)
   - AKS (Azure Kubernetes Service)
   - DigitalOcean Kubernetes
   - Any other Kubernetes cluster

2. **kubectl** installed and configured
3. **Cluster access** with admin permissions

---

## Quick Deploy

### Step 1: Create Namespace
```bash
kubectl apply -f k8s/base/namespace.yaml
```

### Step 2: Create Secrets (IMPORTANT!)
```bash
# Generate secure secrets
JWT_SECRET=$(openssl rand -hex 32)
POSTGRES_PASSWORD=$(openssl rand -hex 16)

# Create secret
kubectl create secret generic containerhub-secrets \
  --namespace=containerhub \
  --from-literal=JWT_SECRET="$JWT_SECRET" \
  --from-literal=POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
  --from-literal=DATABASE_URL="postgresql://postgres:$POSTGRES_PASSWORD@postgres-service:5432/containerhub" \
  --from-literal=REDIS_URL="redis://redis-service:6379"
```

### Step 3: Deploy Infrastructure
```bash
kubectl apply -f k8s/base/configmap.yaml
kubectl apply -f k8s/base/postgres.yaml
kubectl apply -f k8s/base/redis.yaml
```

### Step 4: Wait for Database
```bash
kubectl wait --for=condition=ready pod -l app=postgres -n containerhub --timeout=300s
kubectl wait --for=condition=ready pod -l app=redis -n containerhub --timeout=300s
```

### Step 5: Run Database Migrations
```bash
# Get backend pod name
BACKEND_POD=$(kubectl get pods -n containerhub -l app=backend -o jsonpath='{.items[0].metadata.name}')

# Run migrations
kubectl exec -n containerhub $BACKEND_POD -- npm run db:migrate

# Seed sample problems (optional)
kubectl exec -n containerhub $BACKEND_POD -- npm run db:seed
```

### Step 6: Deploy Application
```bash
kubectl apply -f k8s/base/backend.yaml
kubectl apply -f k8s/base/frontend.yaml
```

### Step 7: Access Application
```bash
# Get frontend service external IP
kubectl get svc frontend-service -n containerhub

# Wait for external IP to be assigned (may take a few minutes)
kubectl get svc frontend-service -n containerhub --watch
```

---

## Deploy with Ingress (Production)

### Install nginx-ingress controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### Install cert-manager (for SSL/TLS)
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

### Update domain in ingress.yaml
```bash
# Edit k8s/base/ingress.yaml
# Replace containerhub.example.com with your actual domain
```

### Deploy ingress
```bash
kubectl apply -f k8s/base/ingress.yaml
```

---

## Management Commands

### View Logs
```bash
# Backend logs
kubectl logs -f -l app=backend -n containerhub

# Frontend logs
kubectl logs -f -l app=frontend -n containerhub

# Database logs
kubectl logs -f -l app=postgres -n containerhub
```

### Scale Deployments
```bash
# Scale backend
kubectl scale deployment backend -n containerhub --replicas=3

# Scale frontend
kubectl scale deployment frontend -n containerhub --replicas=3
```

### Update Application
```bash
# Pull latest images
kubectl rollout restart deployment/backend -n containerhub
kubectl rollout restart deployment/frontend -n containerhub

# Check rollout status
kubectl rollout status deployment/backend -n containerhub
kubectl rollout status deployment/frontend -n containerhub
```

### Database Backup
```bash
# Create backup
kubectl exec -n containerhub \
  $(kubectl get pod -n containerhub -l app=postgres -o jsonpath='{.items[0].metadata.name}') \
  -- pg_dump -U postgres containerhub > backup-$(date +%Y%m%d).sql
```

### Database Restore
```bash
# Restore from backup
kubectl exec -i -n containerhub \
  $(kubectl get pod -n containerhub -l app=postgres -o jsonpath='{.items[0].metadata.name}') \
  -- psql -U postgres containerhub < backup-20240118.sql
```

---

## Monitoring

### Check Pod Status
```bash
kubectl get pods -n containerhub
kubectl get pods -n containerhub --watch
```

### Check Services
```bash
kubectl get svc -n containerhub
```

### Check Resource Usage
```bash
kubectl top pods -n containerhub
kubectl top nodes
```

### Describe Resources
```bash
kubectl describe pod <pod-name> -n containerhub
kubectl describe svc frontend-service -n containerhub
```

---

## Troubleshooting

### Pod not starting
```bash
# Check pod events
kubectl describe pod <pod-name> -n containerhub

# Check logs
kubectl logs <pod-name> -n containerhub

# Check previous logs (if pod restarted)
kubectl logs <pod-name> -n containerhub --previous
```

### Database connection issues
```bash
# Test database connection
kubectl exec -it -n containerhub \
  $(kubectl get pod -n containerhub -l app=postgres -o jsonpath='{.items[0].metadata.name}') \
  -- psql -U postgres -c "SELECT 1"

# Check secret
kubectl get secret containerhub-secrets -n containerhub -o yaml
```

### Service not accessible
```bash
# Port forward for testing
kubectl port-forward -n containerhub svc/frontend-service 3000:80
kubectl port-forward -n containerhub svc/backend-service 3001:3001

# Access at http://localhost:3000
```

---

## Clean Up

### Delete all resources
```bash
kubectl delete namespace containerhub
```

### Delete specific resources
```bash
kubectl delete -f k8s/base/
```

---

## Production Checklist

- [ ] Use external secrets management (HashiCorp Vault, AWS Secrets Manager)
- [ ] Configure resource requests and limits appropriately
- [ ] Set up Horizontal Pod Autoscaling (HPA)
- [ ] Configure network policies for security
- [ ] Set up monitoring (Prometheus, Grafana)
- [ ] Configure logging aggregation (ELK, Loki)
- [ ] Use managed database services (Cloud SQL, RDS) for production
- [ ] Configure backup strategies
- [ ] Set up disaster recovery plan
- [ ] Configure SSL/TLS certificates
- [ ] Set up CI/CD pipelines (Jenkins, GitLab CI)
- [ ] Configure health checks and liveness probes
- [ ] Set up alerting (PagerDuty, Opsgenie)
