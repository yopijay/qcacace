// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    specific = async (id) => { return (await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${id}`).build()).rows; }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        let id = null;
        let code = null;

        if(!((await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0)) {
            let usr = (await new Builder(`tbl_furr_parent`)
                                                .insert({ columns: `series_no, email, code, date_created`, 
                                                                values: `'${global.randomizer(7)}', '${data.email}', '${global.randomizer(6)}', CURRENT_TIMESTAMP` })
                                                .condition(`RETURNING id, code`)
                                                .build()).rows[0];
            id = usr.id;
            code = usr.code;
        }
        else {
            let usr = (await new Builder(`tbl_furr_parent`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];

            id = usr.id;
            code = usr.code;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Thank you for your interest in adopting our loveable pets! To complete your profile and continue your application, 
                you'll need to verify your email address. Your verification code is: <b>${code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: id }
    }

    resend = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        let usr = (await new Builder(`tbl_furr_parent`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Thank you for your interest in adopting our loveable pets! To complete your profile and continue your application, 
                you'll need to verify your email address. Your verification code is: <b>${usr.code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: usr.id }
    }

    verifying = async (data) => { 
        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${data.id} AND code= '${(data.code).toUpperCase()}'`).build()).rowCount > 0) {
            return { result: 'success', message: 'Email verification successfully', id: data.id }
        }
        else {  return { result: 'error', errors: [{ name: 'code', message: 'Verification doesn`t match!' }] } }
    }

    update = async (data) => {
        let usr = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let errors = [];

        if(global.compare(usr.fname, data.fname)) {
            if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name alreeady exist! Change your first name or last name to proceed!' });
            }
        }

        if(global.compare(usr.lname, data.lname)) {
            if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name alreeady exist! Change your first name or last name to proceed!' });
            }
        }

        if(global.compare(usr.contact_no, data.contact_no)) {
            if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                errors.push({ name: 'contact_no', message: 'Contact no. already used!' });
            }
        }

        if(!(errors.length > 0)) {
            await new Builder(`tbl_furr_parent`)
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