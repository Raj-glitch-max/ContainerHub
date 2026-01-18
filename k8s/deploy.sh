# Apply all K8s manifests
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secrets.yaml
kubectl apply -f postgres-statefulset.yaml
kubectl apply -f redis-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f ingress.yaml

# Wait for deployments to be ready
kubectl rollout status statefulset/postgres -n containerhub
kubectl rollout status deployment/redis -n containerhub
kubectl rollout status deployment/backend -n containerhub
kubectl rollout status deployment/frontend -n containerhub

# Run database migrations
kubectl exec -it deployment/backend -n containerhub -- npm run db:migrate
kubectl exec -it deployment/backend -n containerhub -- npm run db:seed

# Get all resources
kubectl get all -n containerhub

# Get ingress
kubectl get ingress -n containerhub

echo "✅ ContainerHub deployed successfully!"
echo "📝 Access the application via the Ingress URL"
