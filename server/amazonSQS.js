const AWS = require('aws-sdk');
const config = require('./aws.config');

AWS.config.update({
  accessKeyId: process.env.SQS_ACCESS_KEY || config.accessKey,
  secretAccessKey: process.env.SQS_SECRET_KEY || config.secretKey,
});

const sqs = new AWS.SQS({ region: process.env.SQS_REGION || config.region });

module.exports.publish = (message) => {
  const sqsParams = {
    MessageBody: JSON.stringify(message),
    QueueUrl: config.queue,
  };

  sqs.sendMessage(sqsParams, (err) => {
    if (err) throw err;
  });
};
