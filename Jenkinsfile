pipeline {
    agent any
    
    stages {
        stage('Build server app') {
            steps {
               dir('server'){ 
                // Install Node.js dependencies
                	sh 'npm install'
                
                // Build your Node.js application
                	sh 'npm run build'
			sh 'zip -r server_build.zip .'
		}
            }
        }
        
        stage('Build client app') {
            steps {
                dir('client') { 
			sh 'npm install'
                
                // Build your Node.js application
                        sh 'npm run build'
                        sh 'zip -r app_build.zip .'
		}
            }
        }
        
        stage('Move to S3') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') // Add your AWS access key ID credentials ID
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key') // Add your AWS secret access key credentials ID
            }
            steps {
                // Move the zip file to an S3 bucket
                sh 'aws s3 cp app_build.zip s3://your_bucket_name/'
            }
        }
    }
}

