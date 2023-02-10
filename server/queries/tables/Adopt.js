// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    list = async () => {
        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adpt.id, pet.photo, adpt.series_no, adpt.schedule_id, adpt.pet_id, adptr.email, adptr.fname, adptr.lname, adpt.status, 
                                                            sched.status AS sched_status, adpt.date_created, pymnt.status AS payment_status`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_schedule AS sched`, condition: `adpt.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_payment AS pymnt`, condition: `adpt.payment_id = pymnt.id`, type: `LEFt` })
                                            .join({ table: `tbl_pets AS pet`, condition: `adpt.pet_id = pet.id`, type: `LEFT` })
                                            .except(`WHERE pymnt.status = 'pending' ORDER BY 11 DESC`)
                                            .build()).rows;

        for(let count = 0; count < list.length; count++) {
            let sched = (await new Builder(`tbl_adopter_schedule`).select(`id, appointment_id, status`).condition(`WHERE id= ${list[count].schedule_id}`).build()).rows[0];

            if(sched.status === 'failed') {
                let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

                await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
                await new Builder(`tbl_adopt`).update(`status= 'cancelled', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${list[count].id}`).build();
            }

            if((await new Builder(`tbl_adopt`).select().condition(`WHERE id= ${list[count].id}`).build()).rows[0].status === 'cancelled') {
                await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${list[count].pet_id}`).build();
            }
        }

        return list;
    }

    specific = async (id) => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, adpt.series_no, adpt.adopter_id, adptr.email, adptr.fname, adptr.lname, pet.photo, pet.series_no AS pet_series, stage.name AS stage,
                                                        pet.gender, pet.tags`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `adpt.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS stage`, condition: `pet.life_stages_id = stage.id`, type: `LEFT` })
                                        .condition(`WHERE adpt.id = ${id}`)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopt`).update(`status= 'released', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();
        
        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`adpt.id, pet.photo, adpt.series_no, adpt.schedule_id, adpt.pet_id, adptr.email, adptr.fname, adptr.lname, adpt.status, 
                                                            sched.status AS sched_status, adpt.date_created`)
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter_schedule AS sched`, condition: `adpt.schedule_id = sched.id`, type: `LEFT` })
                                            .join({ table: `tbl_pets AS pet`, condition: `adpt.pet_id = pet.id`, type: `LEFT` })
                                            .condition(`ORDER BY adpt.date_created DESC`)
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

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Congratulations, You now own the pet`, html: mail });
        return { result: 'success', message: 'Adoption complete!', list: list }
    }
}

module.exports = Adopt;