pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
        echo 'Starting installing dependencies...'

        script {
            if (isUnix()) {
                sh 'npm install'
            } else {
                bat 'npm install'
            }
        }
      }
    }
    stage ('Run Jest Tests'){
      steps{
        echo 'Starting running jest unit tests'
        script {
            if (isUnix()) {
                sh 'npm run test'
            } else {
                bat 'npm run test'
            }
        }
      }
    }
    stage ('Build containers'){
      steps{
        script {
            if (isUnix()) {
               sh 'docker compose down -v'
            } else {
                bat 'docker compose down -v'
            }
        }
      }
    }
  }
}