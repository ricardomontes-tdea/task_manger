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

    stage('Cleanup Containers') {
      steps {
        script {
            bat 'docker-compose down || exit 0'
        }
      }
    }

    stage ('Deploy'){
      steps{
        echo 'deploy stage here....'
      }
    }
  }
}