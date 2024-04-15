pipeline{
  agent any

  stages{
    stage ('build'){
      steps{
        echo '==> Not specifed build stage'
      }
    }
    stage ('Run Jest Tests'){
      steps{
        sh 'npm run test'
      }
    }
    stage ('Deploy'){
      steps{
        sh 'docker compose down -v'
				sh 'docker-compose up -d --build'
      }
    }
  }
}