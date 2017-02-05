'use strict';


exports.sendMsg = function (text) {
    var SmtpClient = require('emailjs-smtp-client')

    var client = new SmtpClient('smtp.mail.ru', 465, {
        useSecureTransport: true,
        auth: {
            user: 'name',
            pass: 'pass'
        },
        enableCompression: true
    });

    client.connect()

    var alreadySending = false;


    client.onidle = function () {
        if (alreadySending) {
            return;
        }
        alreadySending = true;
        client.useEnvelope({
            from: "oselne@mail.ru",
            to: ["artem.vlasov.93@gmail.com"]
        });
    }

    client.onready = function(){
        client.send("Subject: test\r\n");
        client.send("\r\n");
        client.send("Message body " + text);
        client.end();
    }

    client.close()


}

