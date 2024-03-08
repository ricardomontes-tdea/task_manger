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
    stage ('Deploy'){
      steps{
        sh 'docker-compose down -v'
      }
    }
  }
}