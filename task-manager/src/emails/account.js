// Sending emails using sendgrid.com
// steps: Create account on sendgrid and enable MFA for the account via authy
// Under email api, Follow the Integration guide section


const sendGridAPIKey = 'SEND_GRID_API_KEY';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridAPIKey);
// const msg = {
//     to: 'u1504038@student.cuet.ac.bd',
//     from: 'arafath.yeasin1019@gmail.com',
//     subject: 'Development phase test mail via SendGrid',
//     text: 'This is a test mail during development phase!'
// };

// sgMail.send(msg).then(() => {
//     console.log('Email sent')
// }).catch((error) => {
//     console.log(error)
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'arafath.yeasin1019@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    }).then(() => {
        console.log('Mail Sent');
    }).catch((error) => {
        console.log(error);
    })
};

const sendCancelation = (email, name) => {
    sgMail.send({
        to: email,
        from: 'arafath.yeasin1019@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}, I hope to see you back sometime soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelation
}