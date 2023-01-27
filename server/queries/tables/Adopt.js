// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    verify = async (id) => { await new Builder(`tbl_users`).update(`is_email_verified= 1`).condition(`WHERE id= ${id}`).build(); return `<script>window.close();</script>` }
    specific = async (id) => { return (await new Builder(`tbl_adopt_info`).select().condition(`WHERE id= ${id}`).build()).rows; }

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
        else {  return { result: 'error', errors: [{ name: 'code', message: 'Verification doesn`t match!' }] } }
    }

    update = async (data) => {
        let usr = (await new Builder(`tbl_adopt_info`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let errors = [];

        if(global.compare(usr.fname, data.fname)) {
            if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name already used!' });
            }
        }

        if(global.compare(usr.lname, data.lname)) {
            if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name already ussed!' });
            }
        }

        if(global.compare(usr.contact_no, data.contact_no)) {
           if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                errors.push({ name: 'contact_no', message: 'Contact number already used!' });
           }
        }

        if(!(errors.length > 0)) {
            await new Builder(`tbl_adopt_info`)
                                .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                lname= '${(data.lname).toUpperCase()}', gender= '${data.gender}', contact_no= '${data.contact_no}',
                                                address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${data.id}`)
                                .build();
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: errors } }
    }
}

module.exports = Adopt;