// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterSchedule {
    list = async () => {
        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.docu_id, adpt.payment_id, adpt.schedule_id, sched.series_no, 
                                                            adptr.email, adptr.fname, adptr.lname, sched.appointment_id, docu.status AS docu_status, sched.status, sched.date_created`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_schedule AS sched`, condition: `adpt.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_documents AS docu`, condition: `adpt.docu_id = docu.id`, type: `LEFT` })
                                            .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                                            .except(`WHERE docu.status = 'pending' ORDER BY 13 DESC`)
                                            .build()).rows;

        for(let count = 0; count < list.length; count++) {
            let docu = (await new Builder(`tbl_adopter_documents`).select('status').condition(`WHERE id= ${list[count].docu_id}`).build()).rows[0];
            
            if(docu.status === 'reject') {
                if(list[count].schedule_id !== null) {
                    let sched = (await new Builder(`tbl_adopter_schedule`).select('id, appointment_id, status').condition(`WHERE id= ${list[count].schedule_id}`).build()).rows[0];

                    if(sched.status === 'pending') {
                        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];
                        await new Builder(`tbl_adopter_schedule`).update(`status= 'failed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${sched.id}`).build();
                        await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
                        await new Builder(`tbl_adopt`).update(`status= 'cancelled', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${list[count].id}`).build();

                        if((await new Builder(`tbl_adopt`).select().condition(`WHERE id= ${list[count].id}`).build()).rows[0].status === 'cancelled') {
                            await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${list[count].pet_id}`).build();
                        }
                    }
                }
            }
        }
        
        return list;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_schedule`).update(`status= 'passed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.docu_id, adpt.payment_id, adpt.schedule_id, sched.series_no, 
                                                            adptr.email, adptr.fname, adptr.lname, sched.appointment_id, sched.status, sched.date_created`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_schedule AS sched`, condition: `adpt.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                                            .condition(`ORDER BY 13 DESC`)
                                            .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Thank you for taking the time to be interviewed as part of the pet adoption process. 

                        We are pleased to inform you that you <b>PASSED</b> the interview. You can now proceed for the next phase by clicking the button below for the payment details.
                `,
                action: {
                    button: {
                        text: 'Pay here',
                        link: `http://localhost:3000/payment/${btoa(data.adopt_id)}`
                    }
                },
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Interview Status`, html: mail });
        return { result: 'success', message: 'Interview passed!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_schedule`).update(`status= 'failed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adpt.id, adpt.adopter_id, adpt.pet_id, adpt.docu_id, adpt.payment_id, adpt.schedule_id, sched.series_no, 
                                                            adptr.email, adptr.fname, adptr.lname, sched.appointment_id, sched.status, sched.date_created`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_schedule AS sched`, condition: `adpt.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_appointments AS appnt`, condition: `sched.appointment_id = appnt.id`, type: `LEFT` })
                                            .condition(`ORDER BY 13 DESC`)
                                            .build()).rows

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `We really appreciate you taking the time to come in for an interview regarding your application to adopt a pet from the QC Animal Care and Adoption Center. 
                It was a pleasure to us to meet and thank you for your interest in adopting our pets. Unfortunately, 
                we are sorry to inform you that you failed the interview. `,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Failed`, html: mail });
        return { result: 'success', message: 'Interview failed!', list: list }
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        let appointment = (await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.appmonth} AND day= ${data.appday} AND year= ${data.appyear}`).build()).rows[0];
        let adopt = (await new Builder(`tbl_adopt`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];

        
        let sched = (await new Builder(`tbl_adopter_schedule`)
                                                .insert({ columns: `series_no, adopter_id, appointment_id, status, date_created`, 
                                                                values: `'${global.randomizer(7)}', ${data.adopter_id}, ${appointment.id}, 'pending', CURRENT_TIMESTAMP` })
                                                .condition(`RETURNING id`)
                                                .build()).rows[0];
                                                
        await new Builder(`tbl_appointments`).update(`slot= ${appointment.slot - 1}`).condition(`WHERE id= ${appointment.id}`).build();
        await new Builder(`tbl_pets`).update(`is_adopt= 1`).condition(`WHERE id= ${adopt.pet_id}`).build();
        await new Builder(`tbl_adopt`).update(`schedule_id= ${sched.id}, date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `We would like to confirm your set schedule on <b>${appointment.month}/${appointment.day}/${appointment.year}</b>. 
                On this day, the QC Animal Care and Adoption Center staff will conduct an interview regarding your application and you will 
                have the chance to see your preferred pet at our shelter located at Clemente St.,Lupang Pangako, Payatas, Quezon City, Philippines. 
                We are looking forward to seeing you. `,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Appointment Schedule`, html: mail });
        return { result: 'success', message: 'Successfully saved!' }
    }
}

module.exports = AdopterSchedule;