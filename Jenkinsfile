pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
        echo 'installing dependencies...'
      }
    }
    stage ('Run Jest Tests'){
      steps{
         echo 'running tests here.'
      }
    }
    stage ('Build containers'){
      steps{
        sh 'docker compose down -v'
				sh 'docker-compose up -d --build'
      }
    }
  }
}