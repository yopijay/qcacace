// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Subscribers {
    list = async () => { return (await new Builder(`tbl_subscribers`).select().build()).rows; }
    search = async (data) => { return (await new Builder(`tbl_subscribers`).select().condition(`WHERE series_no LIKE '%${data.condition}%' OR email LIKE '%${data.condition}%'`).build()).rows ;}

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let subs = await new Builder(`tbl_subscribers`).select().condition(`WHERE email= '${data.email}'`).build();

        if(subs.rowCount > 0) {
            if(subs.rows[0].is_subscribe === 1) { return { result: 'error', error: [{ name: 'email', message: 'Email already subscribed!' }] } }
            else { 
                let mail = generator.generate({
                    body: {
                        name: 'Fur Mom/Dad',
                        intro: `Thank you message para sa pag re-subscribe and inform natin si user na everytime na may bago tayong pet, programs, and missing pets ay i-e-email natin sya
                                    just in case na meron interested sya ganon.`,
                        
                        outro: 'Please contact me for additional help.'
                    }
                });

                await new Builder(`tbl_subscribers`). update(`is_subscribe= 1, date_subscribe= CURRENT_TIMESTAMP`).condition(`WHERE id= ${subs.rows[0].id}`).build(); 

                transporter.sendMail({ from: global.USER, to: data.email, subject: `Re-subscription`, html: mail });
                return { result: 'success', message: 'Thank you for re-subscribing!' }
            }
        }
        else {
            let mail = generator.generate({
                body: {
                    name: 'Fur Mom/Dad',
                    intro: `Thank you message para sa pagsubscribe and inform natin si user na everytime na may bago tayong pet, programs, and missing pets ay i-e-email natin sya
                                just in case na meron interested sya ganon.`,
                    
                    outro: 'Please contact me for additional help.'
                }
            });
            await new Builder(`tbl_subscribers`)
                                .insert({ columns: `series_no, email, is_subscribe, date_subscribe`, values: `'${global.randomizer(7)}', '${data.email}', 1, CURRENT_TIMESTAMP` })
                                .build();

            transporter.sendMail({ from: global.USER, to: data.email, subject: `Re-subscription`, html: mail });
            return { result: 'success', message: 'Thank you for subscribing!' }
        }
    }
}

module.exports = Subscribers;