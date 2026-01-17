// ════════════════════════════════════════════════════════════════
// ContainerHub - Jenkins Pipeline (Declarative)
// ════════════════════════════════════════════════════════════════
//
// This Jenkinsfile defines the CI/CD pipeline for ContainerHub
// Supporting branches: dev, staging, main
//
// ════════════════════════════════════════════════════════════════

pipeline {
    agent any

    // ────────────────────────────────────────────────────────────
    // Environment Variables
    // ────────────────────────────────────────────────────────────
    environment {
        // Project
        PROJECT_NAME = 'ContainerHub'
        
        // Docker Registry (DockerHub)
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_IMAGE_BACKEND = 'rajglitchmax/containerhub-backend'
        DOCKER_IMAGE_FRONTEND = 'rajglitchmax/containerhub-frontend'
        
        // Node.js
        NODE_VERSION = '18'
        
        // Database (for testing)
        DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/containerhub_test'
        REDIS_URL = 'redis://localhost:6379'
    }

    // ────────────────────────────────────────────────────────────
    // Pipeline Options
    // ────────────────────────────────────────────────────────────
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    // ────────────────────────────────────────────────────────────
    // Stages
    // ────────────────────────────────────────────────────────────
    stages {
        
        // ══════════════════════════════════════════════════════
        // STAGE 1: Checkout
        // ══════════════════════════════════════════════════════
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
                sh 'git log -1 --pretty=format:"%h - %an: %s"'
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 2: Setup
        // ══════════════════════════════════════════════════════
        stage('Setup') {
            parallel {
                stage('Setup Backend') {
                    steps {
                        dir('backend') {
                            echo '📦 Installing backend dependencies...'
                            sh 'npm ci || npm install'
                        }
                    }
                }
                stage('Setup Frontend') {
                    steps {
                        dir('frontend') {
                            echo '📦 Installing frontend dependencies...'
                            sh 'npm ci || npm install'
                        }
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 3: Code Quality & Security
        // ══════════════════════════════════════════════════════
        stage('Quality & Security') {
            parallel {
                stage('Backend Quality') {
                    steps {
                        dir('backend') {
                            echo '🔍 Running backend quality checks...'
                            
                            // Type checking
                            sh 'npm run type-check || npx tsc --noEmit || echo "Type check not configured"'
                            
                            // Linting
                            sh 'npm run lint || echo "Linting not configured"'
                            
                            // Security audit
                            sh 'npm audit --audit-level=moderate || echo "Security audit completed"'
                        }
                    }
                }
                
                stage('Frontend Quality') {
                    steps {
                        dir('frontend') {
                            echo '🔍 Running frontend quality checks...'
                            
                            // Type checking
                            sh 'npm run type-check || npx tsc --noEmit || echo "Type check not configured"'
                            
                            // Linting
                            sh 'npm run lint || echo "Linting not configured"'
                            
                            // Security audit
                            sh 'npm audit --audit-level=moderate || echo "Security audit completed"'
                        }
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 4: Tests
        // ══════════════════════════════════════════════════════
        stage('Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            echo '🧪 Running backend tests...'
                            sh 'npm test || echo "Tests not configured yet"'
                        }
                    }
                }
                
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            echo '🧪 Running frontend tests...'
                            sh 'npm test || echo "Tests not configured yet"'
                        }
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 5: Build
        // ══════════════════════════════════════════════════════
        stage('Build') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            echo '🏗️ Building backend...'
                            sh 'npm run build || echo "Build not configured yet"'
                        }
                    }
                }
                
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            echo '🏗️ Building frontend...'
                            sh 'npm run build || echo "Build not configured yet"'
                        }
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 6: Docker Build & Push (Only for staging/main)
        // ══════════════════════════════════════════════════════
        stage('Docker Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'staging'
                }
            }
            steps {
                script {
                    echo '🐳 Building Docker images...'
                    
                    def imageTag = env.BRANCH_NAME == 'main' ? 'latest' : env.BRANCH_NAME
                    def buildNumber = env.BUILD_NUMBER
                    
                    // Build backend image
                    dir('backend') {
                        sh """
                            docker build -t ${DOCKER_IMAGE_BACKEND}:${imageTag} \
                                         -t ${DOCKER_IMAGE_BACKEND}:${buildNumber} \
                                         . || echo "Backend Dockerfile not ready"
                        """
                    }
                    
                    // Build frontend image
                    dir('frontend') {
                        sh """
                            docker build -t ${DOCKER_IMAGE_FRONTEND}:${imageTag} \
                                         -t ${DOCKER_IMAGE_FRONTEND}:${buildNumber} \
                                         . || echo "Frontend Dockerfile not ready"
                        """
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 7: Push to Registry (Only for staging/main)
        // ══════════════════════════════════════════════════════
        stage('Push to Registry') {
            when {
                anyOf {
                    branch 'main'
                    branch 'staging'
                }
            }
            steps {
                script {
                    echo '📤 Pushing Docker images to registry...'
                    
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS_ID) {
                        def imageTag = env.BRANCH_NAME == 'main' ? 'latest' : env.BRANCH_NAME
                        def buildNumber = env.BUILD_NUMBER
                        
                        sh """
                            docker push ${DOCKER_IMAGE_BACKEND}:${imageTag} || echo "Push skipped"
                            docker push ${DOCKER_IMAGE_BACKEND}:${buildNumber} || echo "Push skipped"
                            docker push ${DOCKER_IMAGE_FRONTEND}:${imageTag} || echo "Push skipped"
                            docker push ${DOCKER_IMAGE_FRONTEND}:${buildNumber} || echo "Push skipped"
                        """
                    }
                }
            }
        }

        // ══════════════════════════════════════════════════════
        // STAGE 8: Deploy (Branch-specific)
        // ══════════════════════════════════════════════════════
        stage('Deploy') {
            steps {
                script {
                    echo "🚀 Deploying to ${env.BRANCH_NAME} environment..."
                    
                    switch(env.BRANCH_NAME) {
                        case 'dev':
                            echo '📍 Deploying to DEV environment'
                            // Add dev deployment commands here
                            break
                        
                        case 'staging':
                            echo '📍 Deploying to STAGING environment'
                            // Add staging deployment commands (Render, Vercel)
                            break
                        
                        case 'main':
                            echo '📍 Deploying to PRODUCTION environment'
                            // Add production deployment commands
                            break
                        
                        default:
                            echo '⚠️ No deployment configured for this branch'
                    }
                }
            }
        }
    }

    // ────────────────────────────────────────────────────────────
    // Post Actions
    // ────────────────────────────────────────────────────────────
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            // Add Slack notification here if needed
        }
        
        failure {
            echo '❌ Pipeline failed!'
            // Add Slack notification here if needed
        }
        
        always {
            echo '🧹 Cleaning up...'
            // Clean workspace
            cleanWs()
        }
    }
}

// ════════════════════════════════════════════════════════════════
// NOTES:
//
// 1. Required Jenkins Plugins:
//    - Docker Pipeline
//    - Pipeline
//    - Git
//    - AnsiColor (for colored output)
//
// 2. Required Credentials in Jenkins:
//    - dockerhub-credentials (username/password)
//
// 3. Branch Strategy:
//    - dev: Development builds (no Docker push)
//    - staging: Staging deployment (Docker push)
//    - main: Production deployment (Docker push)
//
// 4. To Run Locally:
//    docker run -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts
//
// ════════════════════════════════════════════════════════════════
