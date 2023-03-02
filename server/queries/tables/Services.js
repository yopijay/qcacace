// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Services {
    list = async () => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                        srvc.type, srvc.date_filed, srvc.date_evaluated`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .except(`WHERE (pymnt.status IS NULL OR pymnt.status = 'pending') AND srvc.status = 'pending' ORDER BY 12 DESC`)
                                        .build()).rows;
    }

    search = async (data) => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                        srvc.type, srvc.date_filed, srvc.date_evaluated`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .condition(`WHERE srvc.series_no LIKE '%${data.condition}%' OR fp.email LIKE '%${(data.condition).toLowerCase()}%' OR 
                                                                fp.fname LIKE '%${data.condition}%' OR fp.lname LIKE '%${data.condition}%'`)
                                        .except(`WHERE (pymnt.status IS NULL OR pymnt.status = 'pending') AND srvc.status = 'pending' ORDER BY 12 DESC`)
                                        .build()).rows;
    }

    specific = async (id) => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, srvc.series_no, fp.email, fp.fname, fp.mname, fp.lname, fp.contact_no, fp.gender, fp.address, pet.series_no, pet.category_id, pet.breed_id,
                                                        pet.coat_id, pet.life_stages_id, pet.gender AS pet_gender, pet.sterilization, pet.energy_level, pet.weight, pet.color, pet.tags, pet.photo, docs.valid_id, 
                                                        docs.picture, docs.pet_cage, pay.method, pay.transaction_no, app.month, app.day, app.year`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_documents AS docs`, condition: `srvc.docu_id = docs.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pay`, condition: `srvc.payment_id = pay.id`, type: `LEFT` })
                                        .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                                        .join({ table: `tbl_appointments AS app`, condition: `sched.appointment_id = app.id`, type: `LEFT` })
                                        .condition(`WHERE srvc.id= ${id}`)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_services`).update(`status= 'released', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();
        
        let list = (await new Builder(`tbl_services AS srvc`)
                                            .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status, 
                                                            sched.status AS sched_status, srvc.date_filed, pymnt.status AS payment_status`)
                                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                            .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFt` })
                                            .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                            .except(`WHERE pymnt.status = 'pending' ORDER BY 12 DESC`)
                                            .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Good day! We would like to inform that you can now get your adopted pet at QC Animal Care and Adoption Center  
                located at Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines. 

                To help your pet get released quickly, please bring the following items:
                
                1. Cage or Pet carrier (depends on the size of pet)
                2. Leash and Collar`,
                outro: 'Please contact me for additional help.'
            }
        });

        // transporter.sendMail({ from: global.USER, to: data.email, subject: `Congratulations, You now own the pet`, html: mail });
        return { result: 'success', message: 'Adoption complete!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        let sched = (await new Builder(`tbl_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

        await new Builder(`tbl_services`).update(`status= 'cancelled', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();
        await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
        await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();

        let list = (await new Builder(`tbl_services AS srvc`)
                                            .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status, 
                                                            sched.status AS sched_status, srvc.date_filed, pymnt.status AS payment_status`)
                                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                            .join({ table: `tbl_schedule AS sched`, condition: `srvc.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFt` })
                                            .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                            .except(`WHERE pymnt.status = 'pending' ORDER BY 12 DESC`)
                                            .build()).rows;

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `<b>CANCELLED</b>. Notify natin si user na cancelled na yung transaction nya!`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        // transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Payment failed!', list: list }
    }

    update = async (data) => {
        let adopt = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];

        if(!((await new Builder(`tbl_pets`).select().condition(`WHERE id= ${data.pet_id} AND is_adopt = 1`).build()).rowCount > 0)) {
            if(adopt.pet_id !== null) { await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${adopt.pet_id}`).build(); }
            await new Builder(`tbl_services`).update(`pet_id= ${data.pet_id}`).condition(`WHERE id= ${adopt.id}`).build();
            await new Builder(`tbl_pets`).update(`is_adopt= 1`).condition(`WHERE id= ${data.pet_id}`).build();

            return { result: 'success', message: 'Successfully saved!', id: adopt.id }
        }
        else { return { result: 'error', message: 'Pet already adopted' } }
    }
}

module.exports = Services;