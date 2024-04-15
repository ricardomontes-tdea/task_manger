pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
        sh 'npm install'
      }
    }
    stage ('Run Jest Tests'){
      steps{
        sh 'npm test'
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