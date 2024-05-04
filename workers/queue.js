const { Worker, Queue } = require('bullmq');

const connection = { connection: {
  host: 'task_manager_redis',
  port: '6379'
}}

const queue = new Queue('my_queue', connection);

const worker = new Worker('myqueue', async (job) => {
  console.log('job: ', job.data);
}, connection);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

async function addJobToQueue() {
  try {
    const job = await queue.add('myJob', { someData: 'data' });
    console.log(`Job added to queue ID: ${job.id}`);

    return job;

  } catch (error) {
    console.error('error adding jobs:', error);
  }
}

addJobToQueue();
