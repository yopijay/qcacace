// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    list = async () => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, pet.photo, adpt.series_no, adptr.email, adptr.fname, adptr.lname, adpt.status, adpt.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `adpt.pet_id = pet.id`, type: `LEFT` })
                                        .condition(`ORDER BY adpt.date_created DESC`)
                                        .build()).rows;
    }

    status = async () => {
        let adopt = (await new Builder(`tbl_adopt`).select().condition(`ORDER BY date_created ASC`).build()).rows;
        
        for(let count = 0; count < adopt.length; count++) {
            let adopt_id = adopt[count].id;
            let docu_id = adopt[count].docu_id;
            let schedule_id = adopt[count].schedule_id;
            let payment_id = adopt[count].payment_id;
            
            let docu = (await new Builder(`tbl_adopter_documents`).select('status').condition(`WHERE id= ${docu_id}`).build()).rows[0];
            
            console.log(adopt[count].status)
            if(docu.status === 'reject') {
                if(schedule_id !== null) { 
                    (await new Builder(`tbl_adopter_schedule`).select().condition(`WHERE id= ${schedule_id}`).build()).rows[0];

                    await new Builder(`tbl_adopter_schedule`).update(`status= 'failed'`).condition(`WHERE id= ${schedule_id}`).build();
                }
                if(payment_id !== null) { await new Builder(`tbl_adopter_payment`).update(`status= 'failed'`).condition(`WHERE id= ${payment_id}`).build(); }
                await new Builder(`tbl_adopt`).update(`status= 'failed'`).condition(`WHERE id= ${adopt_id}`).build();
            }
            else {
                if(schedule_id !== null) {
                    let sched = (await new Builder(`tbl_adopter_schedule`).select(`status`).condition(`WHERE id= ${schedule_id}`).build()).rows[0];
                    
                    if(sched.status === 'failed') {
                        if(payment_id !== null) { await new Builder(`tbl_adopter_payment`).update(`status= 'failed'`).condition(`WHERE id= ${payment_id}`).build(); }
                        await new Builder(`tbl_adopt`).update(`status= 'failed'`).condition(`WHERE id= ${adopt_id}`).build();
                    }
                    else {
                        if(payment_id !== null) {
                            let payment = (await new Builder(`tbl_adopter_payment`).select('status').condition(`WHERE id= ${payment_id}`).build()).rows[0];
                            if(payment.status === 'failed') { await new Builder(`tbl_adopt`).update(`status= 'failed'`).condition(`WHERE id= ${adopt_id}`).build(); }
                        }
                    }
                }
            }
        }
    }
}

module.exports = Adopt;