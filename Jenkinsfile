pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        BACKEND_IMAGE = "containerhub-backend"
        FRONTEND_IMAGE = "containerhub-frontend"
        K8S_NAMESPACE = "containerhub"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checked out code from ${env.GIT_BRANCH}"
            }
        }
        
        stage('Build Backend') {
            steps {
                script {
                    echo "Building backend Docker image..."
                    docker.build("${BACKEND_IMAGE}:${IMAGE_TAG}", "./backend")
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                script {
                    echo "Building frontend Docker image..."
                    docker.build("${FRONTEND_IMAGE}:${IMAGE_TAG}", "./frontend")
                }
            }
        }
        
        stage('Push Images') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push('latest')
                        
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo "Deploying to Kubernetes cluster..."
                    sh """
                        kubectl apply -f k8s/namespace.yaml
                        kubectl apply -f k8s/configmap.yaml
                        kubectl apply -f k8s/secrets.yaml
                        kubectl apply -f k8s/postgres-statefulset.yaml
                        kubectl apply -f k8s/redis-deployment.yaml
                        kubectl apply -f k8s/backend-deployment.yaml
                        kubectl apply -f k8s/frontend-deployment.yaml
                        kubectl apply -f k8s/ingress.yaml
                        
                        kubectl set image deployment/backend backend=${BACKEND_IMAGE}:${IMAGE_TAG} -n ${K8S_NAMESPACE}
                        kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}:${IMAGE_TAG} -n ${K8S_NAMESPACE}
                        
                        kubectl rollout status deployment/backend -n ${K8S_NAMESPACE}
                        kubectl rollout status deployment/frontend -n ${K8S_NAMESPACE}
                    """
                }
            }
        }
        
        stage('Run Database Migrations') {
            steps {
                script {
                    echo "Running database migrations..."
                    sh """
                        kubectl exec -it deployment/backend -n ${K8S_NAMESPACE} -- npm run db:migrate
                    """
                }
            }
        }
        
        stage('Smoke Tests') {
            steps {
                script {
                    echo "Running smoke tests..."
                    sh """
                        kubectl get pods -n ${K8S_NAMESPACE}
                        kubectl get services -n ${K8S_NAMESPACE}
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo "✅ Pipeline completed successfully!"
            echo "Backend: ${BACKEND_IMAGE}:${IMAGE_TAG}"
            echo "Frontend: ${FRONTEND_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
        always {
            cleanWs()
        }
    }
}
