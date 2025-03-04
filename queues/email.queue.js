const { Queue } = require('bullmq');

const connection = {
  connection: {
    host: 'task_manager_redis' ,
    port: '6379'
  }
}

const emailQueue = new Queue('email_queue', connection);

const addJobToQueue = async () => { 

  const uid = new Date().getTime();

  try {
    const job = await emailQueue.add('newEmailJob',{
      data: `new email queued ${uid}`
    });

    console.log(`Job added to queue: ${ job.id }`)
  } catch (error) {
    console.log('Some errors when adding a new job to queue', error);
  }
}

addJobToQueue();