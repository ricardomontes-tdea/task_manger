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
        sh 'sudo docker compose down -v'
				sh 'sudo docker-compose up -d --build'
      }
    }
  }
}