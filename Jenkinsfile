pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
        echo 'installing dependencies...'
        sh 'npm install'
      }
    }
    stage ('Run Jest Tests'){
      steps{
         echo 'running tests here.'
         sh 'npm run jest'
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