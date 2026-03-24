pipeline {
    agent any

    environment {
        AWS_REGION = "us-east-2"
        ACCOUNT_ID = "836822603072"
        FRONTEND_REPO = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend-repo"
        BACKEND_REPO = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/backend-repo"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/samuelomofomah/techpathway-2.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t frontend ./frontend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t backend ./backend'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Tag Images') {
            steps {
                sh '''
                docker tag frontend:latest $FRONTEND_REPO:latest
                docker tag backend:latest $BACKEND_REPO:latest
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                docker push $FRONTEND_REPO:latest
                docker push $BACKEND_REPO:latest
                '''
            }
        }
    }
}