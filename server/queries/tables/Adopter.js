// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    specific = async (id) => { return (await new Builder(`tbl_adopter`).select().condition(`WHERE id= ${id}`).build()).rows; }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        let id = null;
        let code = null;

        if(!((await new Builder(`tbl_adopter`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0)) {
            let usr = (await new Builder(`tbl_adopter`)
                                                .insert({ columns: `series_no, email, code, date_created`, 
                                                                values: `'${global.randomizer(7)}', '${data.email}', '${global.randomizer(6)}', CURRENT_TIMESTAMP` })
                                                .condition(`RETURNING id, code`)
                                                .build()).rows[0];
            id = usr.id;
            code = usr.code;
        }
        else {
            let usr = (await new Builder(`tbl_adopter`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];

            id = usr.id;
            code = usr.code;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum elit in venenatis euismod. Suspendisse id eros porta, ultrices velit ac, pellentesque lectus. 
                            Nunc dictum mattis lorem a varius. Nullam a ante sed ex fermentum semper. <b>${code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: 'flipmusicc@gmail.com', to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: id }
    }

    resend = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        let usr = (await new Builder(`tbl_adopter`).update(`code= '${global.randomizer(6)}'`).condition(`WHERE email= '${data.email}' RETURNING id, code`).build()).rows[0];

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum elit in venenatis euismod. Suspendisse id eros porta, ultrices velit ac, pellentesque lectus. 
                            Nunc dictum mattis lorem a varius. Nullam a ante sed ex fermentum semper. <b>${usr.code}</b>`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: 'flipmusicc@gmail.com', to: data.email, subject: `Email verification`, html: mail });
        return { result: 'success', message: 'Email verification sent!', id: usr.id }
    }

    verifying = async (data) => { 
        if((await new Builder(`tbl_adopter`).select().condition(`WHERE id= ${data.id} AND code= '${(data.code).toUpperCase()}'`).build()).rowCount > 0) {
            return { result: 'success', message: 'Email verification successfully', id: data.id }
        }
        else {  return { result: 'error', errors: [{ name: 'code', message: 'Verification doesn`t match!' }] } }
    }

    // update = async (data) => {
    //     let usr = (await new Builder(`tbl_adopt_info`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
    //     let errors = [];

    //     if(global.compare(usr.fname, data.fname)) {
    //         if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
    //             errors.push({ name: 'lname', message: 'Name already used!' });
    //         }
    //     }

    //     if(global.compare(usr.lname, data.lname)) {
    //         if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
    //             errors.push({ name: 'lname', message: 'Name already ussed!' });
    //         }
    //     }

    //     if(global.compare(usr.contact_no, data.contact_no)) {
    //        if((await new Builder(`tbl_adopt_info`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
    //             errors.push({ name: 'contact_no', message: 'Contact number already used!' });
    //        }
    //     }

    //     if(!(errors.length > 0)) {
    //         await new Builder(`tbl_adopt_info`)
    //                             .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
    //                                             lname= '${(data.lname).toUpperCase()}', gender= '${data.gender}', contact_no= '${data.contact_no}',
    //                                             address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
    //                             .condition(`WHERE id= ${data.id}`)
    //                             .build();
    //         return { result: 'success', message: 'Successfully saved!' }
    //     }
    //     else { return { result: 'error', error: errors } }
    // }

    update = async (data) => {
        let usr = (await new Builder(`tbl_adopter`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let errors = [];

        if(global.compare(usr.fname, data.fname)) {
            if((await new Builder(`tbl_adopter`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name alreeady exist! Change your first name or last name to proceed!' });
            }
        }

        if(global.compare(usr.lname, data.lname)) {
            if((await new Builder(`tbl_adopter`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                errors.push({ name: 'lname', message: 'Name alreeady exist! Change your first name or last name to proceed!' });
            }
        }

        if(global.compare(usr.contact_no, data.contact_no)) {
            if((await new Builder(`tbl_adopter`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                error.push({ name: 'contact_no', message: 'Contact no. already used!' });
            }
        }

        if(!(errors.length > 0)) {
            await new Builder(`tbl_adopter`)
                                .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                lname= '${(data.lname).toUpperCase()}', gender= '${data.gender}', contact_no= '${data.contact_no}',
                                                address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${data.id}`)
                                .build();
            
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: errors } }
    }
    // verify = async (id) => { await new Builder(`tbl_users`).update(`is_email_verified= 1`).condition(`WHERE id= ${id}`).build(); return `<script>window.close();</script>` }
    // specific = async (id) => { 
    //     return (await new Builder(`tbl_adopt_info AS info`)
    //                                     .select()
    //                                     .join({ table: `tbl_adopt_documents AS docu`, condition: `docu.info_id = info.id`, type: 'LEFT' })
    //                                     .condition(`WHERE info.id= ${id}`)
    //                                     .build()).rows; 
    // }

    // save = async (data) => {
    //     if((await new Builder(`tbl_adopt_documents`).select().condition(`WHERE info_id= ${data.id}`).build()).rowCount > 0) {
    //         let old = (await new Builder(`tbl_adopt_documents`).select().condition(`WHERE info_id= ${data.id}`).build()).rows[0];

    //         let docu = (await new Builder(`tbl_adopt_documents`)
    //                                             .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', date_updated= CURRENT_TIMESTAMP`)
    //                                             .condition(`WHERE id= ${old.id} RETURNING id`)
    //                                             .build()).rows[0];

    //         let adpt = (await new Builder(`tbl_adopt`)
    //                                             .insert({ columns: `series_no, info_id, pet_id, docu_id, date_created`, 
    //                                                             values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docu.id}, CURRENT_TIMESTAMP` })
    //                                             .condition(`RETURNING id`)
    //                                             .build()).rows[0];

    //         return { result: 'success', message: 'Successfully saved!', id: adpt.id }
    //     }
    //     else {
    //         let docu = (await new Builder(`tbl_adopt_documents`)
    //                             .insert({ columns: `series_no, info_id, valid_id, picture, pet_cage, date_created`, 
    //                                             values: `'${global.randomizer(7)}', ${data.id}, '${data.valid_id}', '${data.picture}', '${data.pet_cage}', CURRENT_TIMESTAMP` })
    //                             .condition(`RETURNING id`)
    //                             .build()).rows[0];
            
    //         let adpt = (await new Builder(`tbl_adopt`)
    //                                             .insert({ columns: `series_no, info_id, pet_id, docu_id, date_created`, 
    //                                                             values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docu.id}, CURRENT_TIMESTAMP` })
    //                                             .condition(`RETURNING id`)
    //                                             .build()).rows[0];

    //         return { result: 'success', message: 'Successfully saved!', id: adpt.id }
    //     }
    // }

    // schedule = async (data) => {
    //     await new Builder(`tbl_adopt`).update(`schedule= '${data.appmonth}/${data.appday}/${data.appyear}'`).condition(`WHERE id= ${data.id}`).build();
    //     return { result: 'success', message: 'Appointment set successfully!'};
    // }

    // payment = async (data) => {
    //     let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
    //     let transporter = nodemailer.createTransport(config);
    //     let generator = new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

    //     if(data.payment === 'gcash') {
    //         if((await new Builder(`tbl_adopt_payment`).select().condition(`WHERE transaction_no= '${data.transaction_no}'`).build()).rowCount > 0) {
    //             return { result: 'error', errors: [{ name: 'transaction_no', message: 'Transaction no already used!' }] }
    //         }
    //     }

    //     let pay = (await new Builder(`tbl_adopt_payment`)
    //                                         .insert({ columns: `series_no, info_id, payment_method, amount, transaction_no, status, date_created`, 
    //                                                         values: `'${global.randomizer(7)}', ${data.info_id}, '${data.payment}', '250', ${data.payment === 'gcash' ? `'${data.transaction_no}'` : null},
    //                                                                         'unpaid', CURRENT_TIMESTAMP` })
    //                                         .condition(`RETURNING id`)
    //                                         .build()).rows[0];
        
    //     await new Builder(`tbl_adopt`).update(`payment_id= ${pay.id}`).condition(`WHERE id= ${data.adopt_id}`).build();

    //     let mail = generator.generate({
    //         body: {
    //             name: 'Fur Mom/Dad',
    //             intro: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum elit in venenatis euismod. Suspendisse id eros porta, ultrices velit ac, pellentesque lectus. 
    //                         Nunc dictum mattis lorem a varius. Nullam a ante sed ex fermentum semper.`,
    //             action: {
    //                 button: {
    //                     text: 'See progress',
    //                     color: '#1b4168',
    //                     link: `http://localhost:3000/progress/${btoa(data.adopt_id)}`
    //                 }
    //             },
    //             outro: 'Please contact me for additional help.'
    //         }
    //     });

    //     transporter.sendMail({ from: 'flipmusicc@gmail.com', to: data.email, subject: `Adoption Progress`, html: mail });
    //     return { result: 'success', message: 'Payment sent!' }
    // }
}

module.exports = Adopt;