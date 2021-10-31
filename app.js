const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (err, conn) {
  if (err) console.log("Erro ao criar aplicacao no rabbit", err);
  else
    conn.createChannel(function (err, ch) {
      const q = "hello";
      const msg = "Hello World 123!";
      ch.assertQueue(q, { durable: false });
      ch.sendToQueue(q, new Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
  setTimeout(function () {
    conn.close();
    process.exit(0);
  }, 500);
});
