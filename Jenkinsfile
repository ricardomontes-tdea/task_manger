pipeline{
  agent any

  stages{
    stage ('build'){
      steps{
        echo '==> Not specifed build stage'
      }
    }
    
    stage ('Test'){
      steps{
        echo '==> Not specifed test stage'
      }
    }

    stage('Cleanup containers') {
      steps {
        script {
            bat 'docker-compose down --remove-orphans -v'
        }
      }
    }

    stage ('Build containers'){
      steps{
        bat 'docker-compose up -d'
        echo 'deploy stage here....'
      }
    }
  }
}