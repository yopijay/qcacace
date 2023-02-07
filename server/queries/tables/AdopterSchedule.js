// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterSchedule {
    list = async () => {
        return (await new Builder(`tbl_adopter_schedule AS sched`)
                                        .select(`sched.id, sched.series_no, adptr.email, adptr.contact_no, adptr.fname, adptr.lname, sched.status, sched.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `sched.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`ORDER BY sched.date_created DESC`)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_schedule`).update(`status= 'passed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopter_schedule AS sched`)
                                        .select(`sched.id, sched.series_no, adptr.email, adptr.contact_no, adptr.fname, adptr.lname, sched.status, sched.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `sched.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`ORDER BY sched.date_created DESC`)
                                        .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `<b>PASSED</b>. Notify natin si user na pasado sya sa virtual interview, and wait nya na lang yung email natin para sa link ng payment.`,
                action: {
                    button: {
                        text: 'Pay here',
                        link: 'http://localhost:3000/payment'
                    }
                },
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Interview passed!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_schedule`).update(`status= 'failed', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopter_schedule AS sched`)
                                        .select(`sched.id, sched.series_no, adptr.email, adptr.contact_no, adptr.fname, adptr.lname, sched.status, sched.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `sched.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`ORDER BY sched.date_created DESC`)
                                        .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `<b>FAILED</b>. Notify natin si user na bagsak sya sa ating initial interview, resulting to termination ng application nya.`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Interview failed!', list: list }
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

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
                intro: `Ang naiisip kong message na ilagay dito is yung i-inform nyo yung adopter na ito yung sched nya, and make sure na tama yung number na inilgay nya dun sa form natin
                            para sa on-call interview or kung anong klaseng interview man yung balak nyo gawin, kung pupunta sya mismo sa shop nyo para sa interview or kung ano man.
                            Here is your schedule: <b>${appointment.month}/${appointment.day}/${appointment.year}</b>.`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: 'flipmusicc@gmail.com', to: data.email, subject: `Appointment schedule`, html: mail });
        return { result: 'success', message: 'Successfully saved!' }
    }
}

module.exports = AdopterSchedule;