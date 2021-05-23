function callMetrics(data) {
  console.log(data)
  const url = document.location.href;
  const apiUrl = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/metrics-vafsl/service/yo/incoming_webhook/webhook';
  fetch(`${apiUrl}?url=${url}&data=${JSON.stringify(data)}`);
} 
