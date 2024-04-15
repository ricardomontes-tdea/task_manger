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
        bat 'docker compose down -v'
				bat 'docker-compose up -d --build'
      }
    }
  }
}