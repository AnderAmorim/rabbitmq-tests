const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) console.log("Erro ao criar worker no rabbit", err);
  else
    conn.createChannel(function (err, ch) {
      const q = "hello";

      ch.assertQueue(q, { durable: false });
      ch.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
      ch.consume(
        q,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        { noAck: true }
      );
    });
});
