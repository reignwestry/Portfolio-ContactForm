const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

//# IMPORTS EXTERNAL VARIABLES
require('./variables');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/api/form', (req, res)=>{
    console.log(req.body)     // LOGS EMAIL SENT DATA TO CONSOLE FOR TESTING

    nodemailer.createTestAccount(( err, account ) => {
        const htmlEmail = `
            <h3>${messageSubject}</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            host: host,
            port: 993,
            auth: {
                user: username,   // client username
                pass: pass    // client password
            }
        })

        let mailOptions = {
            from: senderEmail,
            to:  receiverEmail,
            replyTo: senderEmail,
            subject: messageSubject,
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err)
            }

            console.log('Message sent: %s', info.message)
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })  
});

const PORT = process.env.PORT || 3001



app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})
