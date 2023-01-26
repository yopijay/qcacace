// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    verify = async (id) => { await new Builder(`tbl_users`).update(`is_email_verified= 1`).condition(`WHERE id= ${id}`).build(); return `<script>window.close();</script>` }

    register = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator = new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });
        let _id = null;
        let _code = null

        if(!((await new Builder(`tbl_adopt_info`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0)) {
            let usr = (await new Builder(`tbl_adopt_info`)
                                                .insert({ columns: `series_no, email, code, date_created`, 
                                                                values: `'${global.randomizer( 7)}', '${data.email}', '${global.randomizer(6)}', CURRENT_TIMESTAMP` })
                                                .condition(`RETURNING id, code`)
                                                .build()).rows[0];
            _id = usr.id;
            _code = usr.code;
        }
        else {
            let usr = (await new Builder(`tbl_adopt_info`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];
            _id = usr.id;
            _code = usr.code;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum elit in venenatis euismod. Suspendisse id eros porta, ultrices velit ac, pellentesque lectus. 
                            Nunc dictum mattis lorem a varius. Nullam a ante sed ex fermentum semper. <b>${_code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: 'flipmusicc@gmail.com', to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: _id }
    }

    verifying = async (data) => { 
        if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE id= ${data.id} AND code= '${(data.code).toUpperCase()}'`).build()).rowCount > 0) {
            return { result: 'success', message: 'Email verification successfully', id: data.id }
        }
        else { 
            return { result: 'error', errors: [{ name: 'code', message: 'Verification doesn`t match!' }] }
        }
        // return (await new Builder(`tbl_users`).select(`is_email_verified`).condition(`WHERE id= ${id}`).build()).rows[0]; 
    }
}

module.exports = Adopt;