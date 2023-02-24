// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterPayment {
    list = async () => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.payment_id, adpt.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method, pymnt.status,
                                                        pymnt.date_created, adptr.email, adptr.fname, adptr.lname`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_adopter_payment AS pymnt`, condition: `adpt.payment_id = pymnt.id`, type: `LEFT` })
                                        .except(`WHERE adpt.payment_id IS NULL  ORDER BY 9 DESC`)
                                        .build()).rows;
    }
    
    search = async (data) => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.payment_id, adpt.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method, pymnt.status,
                                                        pymnt.date_created, adptr.email, adptr.fname, adptr.lname`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_adopter_payment AS pymnt`, condition: `adpt.payment_id = pymnt.id`, type: `LEFT` })
                                        .condition(`WHERE pymnt.transaction_no LIKE '%${data.condition}%' OR pymnt.series_no LIKE '%${data.condition}%'`)
                                        .except(`WHERE adpt.payment_id IS NULL ORDER BY 9 DESC`)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_payment`).update(`status= 'paid', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.payment_id, adpt.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method, pymnt.status,
                                                        pymnt.date_created, adptr.email, adptr.fname, adptr.lname`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_adopter_payment AS pymnt`, condition: `adpt.payment_id = pymnt.id`, type: `LEFT` })
                                        .except(`WHERE adpt.payment_id IS NULL ORDER BY 9 DESC`)
                                        .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Good day! We would like to inform you that your payment has been validated by QC Animal Care and Adoption Center's evaluator. 
                You can now proceed to the last part of the pet adoption process which is the releasing of pets. Thank you!.`,
                outro: 'If you have any concerns, Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Payment Received`, html: mail });
        return { result: 'success', message: 'Payment confirmed!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        let sched = (await new Builder(`tbl_adopter_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

        await new Builder(`tbl_adopter_payment`).update(`status= 'failed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.payment_id}`).build();
        await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
        await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();
        await new Builder(`tbl_adopt`).update(`status= 'cancelled', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.payment_id, adpt.schedule_id, pymnt.series_no, pymnt.transaction_no, pymnt.method, pymnt.status,
                                                        pymnt.date_created, adptr.email, adptr.fname, adptr.lname`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_adopter_payment AS pymnt`, condition: `adpt.payment_id = pymnt.id`, type: `LEFT` })
                                        .except(`WHERE adpt.payment_id IS NULL ORDER BY 9 DESC`)
                                        .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `<b>FAILED</b>. Notify natin si user na lumipas na yung 3 days na palugit natin para makapag bayad sya`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Payment failed!', list: list }
    }

    pay = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

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

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Good day! We would like to inform you that your payment has been sent. 
                            Please wait within 48 hours for the validation email of your payment. 
                            If you don't receive an email within the specified time limit, you can go directly to our center located at 
                            Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines and bring the transaction number of your payment 
                            for the validation.`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: adpt.email, subject: `Payment Status`, html: mail });
            return { result: 'success', message: 'Payment sent!' }
        }
        else { return { result: 'error', errors: errors } }
    }
}

module.exports = AdopterPayment;