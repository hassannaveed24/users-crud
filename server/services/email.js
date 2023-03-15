const Sib = require("sib-api-v3-sdk");

class Email {
    constructor(client) {
        this.client = client;
    }

    async send(opts) {
        const { senderEmail, senderName, receivers, subject, htmlContent } = opts || {};
        return await this.client.sendTransacEmail({
            sender: {
                email: senderEmail,
                name: senderName,
            },
            to: receivers,
            subject,
            htmlContent,
        });
    }
}

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

module.exports.emailInstance = new Email(new Sib.TransactionalEmailsApi());
