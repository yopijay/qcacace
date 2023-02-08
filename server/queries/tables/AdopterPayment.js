// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterPayment {
    list = async () => {
        return (await new Builder(`tbl_adopter_payment AS pymnt`)
                                        .select(`pymnt.id, pymnt.series_no, pymnt.transaction_no, adptr.email, adptr.contact_no, adptr.fname, adptr.lname, pymnt.status, pymnt.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `pymnt.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`ORDER BY pymnt.date_created DESC`)
                                        .build()).rows;
    }

    pay = async (data) => {
        // let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        // let transporter = nodemailer.createTransport(config);
        // let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        let adpt = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adptr.id, adptr.email`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .condition(`WHERE adpt.id= ${data.id}`)
                                            .build()).rows[0];
        let errors = [];

        if(data.payment === 'gcash') {
            if((await new Builder(`tbl_adopter_payment`).select().condition(`WHERE transaction_no= '${data.transaction_no}'`).build()).rowCount > 0) {
                errors.push({ name: 'transaction_no', message: 'Transaction number already used!' });
            }
        }

        if(!(errors.length > 0)) {
            let payment = (await new Builder(`tbl_adopter_payment`)
                                                        .insert({ columns: `series_no, adopter_id, method, amount, transaction_no, status, date_created`, 
                                                                        values: `'${global.randomizer(7)}', ${adpt.id}, '${data.payment}', '250', ${data.payment === 'gcash' ? `'${data.transaction_no}'` : null},
                                                                                        'pending', CURRENT_TIMESTAMP` })
                                                        .condition(`RETURNING id`)
                                                        .build()).rows[0];

            await new Builder(`tbl_adopt`).update(`payment_id= ${payment.id}, date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        // let mail = generator.generate({
        //     body: {
        //         name: 'Fur Mom/Dad',
        //         intro: `Inform nyo si user na nagsend na yung payment nya and wait nya yung email natin within 48 hours, kung hindi dumating email natin
        //                      punta na sya sa office natin and i-remind sya na dalhin yung transaction no. nya sa gcash kung nag gcash man sya,
        //                      kung nag cash naman sya, dalhin nya yung bayad sa physical store.`,
                
        //         outro: 'Please contact me for additional help.'
        //     }
        // });

        // transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
            return { result: 'success', message: 'Payment sent!' }
        }
        else { return { result: 'error', error: errors } }
    }
}

module.exports = AdopterPayment;