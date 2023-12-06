pipeline {
    agent any
    
    stages {
        stage('Build server app') {
            steps {
               dir('server'){ 
                // Install Node.js dependencies
                	sh 'npm install'
                
                // Build your Node.js application
               // 	sh 'npm run build'
			sh 'zip -r server_build.zip .'
			sh 'ls -al'
		}
            }
        }
        
        stage('Build client app') {
            steps {
                dir('client') { 
			sh 'npm install'
                
                // Build your Node.js application
                //        sh 'npm run build'
                        sh 'zip -r app_build.zip .'
		}
            }
        }
        
        stage('Move to S3') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') 
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key') 
            }
            steps {
           
                sh 'aws s3 cp client/app_build.zip s3://sumaiya-upgrad/'
		        sh 'aws s3 cp server/server_build.zip s3://sumaiya-upgrad/'
            }
        }
        stage('Deploy') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') 
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key') 
                AWS_DEFAULT_REGION='us-east-1'
            }
            steps {
                script {

                    sh '''
                        aws deploy create-deployment \
                            --application-name 'employee-client' \
                            --deployment-group-name 'employee-client' \
                            --s3-location bucket='sumaiya-upgrad',key='app_build.zip',bundleType=zip
                    '''
            
                    
                   
                }
            }
        }
        
    }
}

