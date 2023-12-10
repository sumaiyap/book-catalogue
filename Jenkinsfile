pipeline {
    agent any
    
    stages {
        stage('Build server app') {
            steps {
              
			        sh 'zip -r server_build.zip .'
			        sh 'ls -al'
		        
            }
        }

        
        stage('Move to S3') {
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') 
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key') 
            }
            steps {
           
		        sh 'aws s3 cp server_build.zip s3://sumaiya-upgrad/'
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
                            --deployment-group-name 'employee-server' \
                            --s3-location bucket='sumaiya-upgrad',key='server_build.zip',bundleType=zip
                    '''            
                }
            }
        }
        
    }
}

