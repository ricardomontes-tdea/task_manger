pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
        echo 'installing dependencies...'

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
        echo 'running tests here.'
        script {
            if (isUnix()) {
                  sh 'npm run jest'
            } else {
                bat 'npm run jest'
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