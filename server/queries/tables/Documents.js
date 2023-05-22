// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Documents {
    specific = async (id) => { 
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, pet.photo, pet.series_no, pet.category_id, pet.breed_id, pet.coat_id, pet.life_stages_id, pet.gender, pet.sterilization, pet.energy_level, pet.weight,
                                                        pet.color, pet.tags, fp.email, fp.fname, fp.mname, fp.lname, fp.contact_no, fp.gender, fp.street, docu.valid_id, docu.picture, fp.barangay, fp.city,
                                                        docu.pet_cage, docu.proof_billing, srvc.reason, srvc.type, fp.birthdate, docu.status`)
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                        .condition(`WHERE srvc.id= ${id}`)
                                        .build()).rows;
    }

    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_documents`).select().build()).rowCount,
            approved: (await new Builder(`tbl_documents`).select().condition(`WHERE status= 'approved'`).build()).rowCount,
            pending: (await new Builder(`tbl_documents`).select().condition(`WHERE status= 'pending'`).build()).rowCount,
            reject: (await new Builder(`tbl_documents`).select().condition(`WHERE status= 'reject'`).build()).rowCount,
        }
    }

    search = async (data) => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`MAX(srvc.id) AS id, MAX(srvc.furr_parent_id) AS furr_parent_id, MAX(srvc.pet_id) AS pet_id, srvc.docu_id,
                                                        MAX(srvc.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture,
                                                        MAX(docu.pet_cage) AS pet_cage, MAX(fp.email) AS email, MAX(fp.fname) AS fname, MAX(fp.lname) AS lname,
                                                        MAX(CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname)) AS evaluated_by,
                                                        MAX(docu.status) AS status, MAX(docu.date_filed) AS date_filed, MAX(docu.date_evaluated) AS date_evaluated, MAX(srvc.type) AS type`)
                                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `docu.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .condition(`WHERE (docu.series_no LIKE '%${data.condition}%' OR fp.email LIKE '%${(data.condition).toLowerCase()}%'
                                                                OR fp.fname LIKE '%${data.condition}%' OR fp.lname LIKE '%${data.condition}%') AND srvc.docu_id IS NOT NULL
                                                                GROUP BY srvc.docu_id ORDER BY date_filed DESC`)
                                        .build()).rows;
    }

    list = async () => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`MAX(srvc.id) AS id, MAX(srvc.furr_parent_id) AS furr_parent_id, MAX(srvc.pet_id) AS pet_id, srvc.docu_id,
                                                        MAX(srvc.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture,
                                                        MAX(docu.pet_cage) AS pet_cage, MAX(fp.email) AS email, MAX(fp.fname) AS fname, MAX(fp.lname) AS lname,
                                                        MAX(CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname)) AS evaluated_by,
                                                        MAX(docu.status) AS status, MAX(docu.date_filed) AS date_filed, MAX(docu.date_evaluated) AS date_evaluated, MAX(srvc.type) AS type`)
                                        .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_users_info AS eb`, condition: `docu.evaluated_by = eb.user_id`, type: `LEFT` })
                                        .condition(`WHERE srvc.docu_id IS NOT NULL GROUP BY srvc.docu_id ORDER BY date_filed DESC`)
                                        .build()).rows;
    }

    approve = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        let srvc = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        
        await new Builder(`tbl_documents`)
                            .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', proof_billing= '${data.proof_billing}', 
                                            status= 'approved', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${srvc.docu_id}`)
                            .build();
        
        if(data.type === 'adoption') {
            _intro = `Thank you so much for taking the time to apply for the pet adoption in QC Animal Care and Adoption Center. After reviewing your application and documents, we are pleased
                            to inform you that you have <b>PASSED</b> and been pre-qualified for the next stage of the adoption process, which is the interview. As part of our adoption
                            process, our staff wil conduct an interview to discuss your application and ensure the best possible match for both you and your potenatial furry friend. Please be
                            assured that the interview questions are designed to help us better understand your lifestyle, living situation, and expectations, and are in no way meant
                            to be intrusive or offensive.<br><br>
                            
                            Plese be advised that the interview can be conducted online via google meet using this link: 
                            <a href= "https://meet.google.com/ysw-mrug-emz">https://meet.google.com/ysw-mrug-emz</a>, or you may visit our center located at Clemente St., Lupang
                            Pangako, Payatas, Quezon City.`;
        }
        else {
            _intro = `Good day! We have received  your application and submitted documents for the surrendering of your pet. 
            Please take note that we do not encourage pet owners to surrender their pet. However, to know the reasons for your application, 
            we would like to do an interview with you through phone call or google meet. Please wait for the next phase of the surrendering process after the interview. Thank you!
            `;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Document Status`, html: mail });
        return { result: 'success', message: 'Documents approved!' }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS }, tls : { rejectUnauthorized: false } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://qcacace.vercel.app' } });
        let _intro = '';

        let sched = (await new Builder(`tbl_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

        await new Builder(`tbl_documents`).update(`status= 'reject', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.docu_id}`).build();
        await new Builder(`tbl_schedule`).update(`status= 'failed', evaluated_by= ${data.evaluator}, date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.schedule_id}`).build();
        
        if(data.type === 'adoption') {
            await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
            await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();
        }

        await new Builder(`tbl_services`).update(`status= 'cancelled', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_services AS srvc`)
                                            .select(`MAX(srvc.id) AS id, MAX(srvc.furr_parent_id) AS furr_parent_id, MAX(srvc.pet_id) AS pet_id, srvc.docu_id,
                                                            MAX(srvc.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture,
                                                            MAX(docu.pet_cage) AS pet_cage, MAX(fp.email) AS email, MAX(fp.fname) AS fname, MAX(fp.lname) AS lname,
                                                            MAX(CONCAT(eb.lname, ', ', eb.fname, ' ', eb.mname)) AS evaluated_by,
                                                            MAX(docu.status) AS status, MAX(docu.date_filed) AS date_filed, MAX(docu.date_evaluated) AS date_evaluated, MAX(srvc.type) AS type`)
                                            .join({ table: `tbl_documents AS docu`, condition: `srvc.docu_id = docu.id`, type: `LEFT` })
                                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                            .join({ table: `tbl_users_info AS eb`, condition: `docu.evaluated_by = eb.user_id`, type: `LEFT` })
                                            .condition(`WHERE srvc.docu_id IS NOT NULL GROUP BY srvc.docu_id ORDER BY date_filed DESC`)
                                            .build()).rows;

        if(data.type === 'adoption') {
            _intro = `Thank you so much for taking the time to apply for the pet adoption in QC Animal Care and Adoption Center. <br>

                                We have reviewed your application and submitted documents, and we are sorry to inform you that your application has been rejected by the evaluator.<br>
                                
                                The reason could be one of the following:<br><br>
                                
                                1. Blurred or unreadable documents<br>
                                2. Fake or incorrect details<br>
                                3. Not eligible to adopt pet due to house environment`;
        }
        else {
            _intro = `Good day! We are sorry to inform you that you surrender application transaction has been canceled. 
            Due to many reason. Please take note that we do not encourage pet owners to surrender their pet. Thank you!.`;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'If you think this is a mistake,Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Application Failed`, html: mail });
        return { result: 'success', message: 'Documents rejected!', list: list }
    }

    save = async (data) => {
        switch(data.application_type) {
            case 'walk-in':
                let adopt = (await new Builder(`tbl_services`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
                
                if(adopt.docu_id !== null) {
                    await new Builder(`tbl_documents`)
                                        .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', 
                                                            evaluated_by= ${data.evaluated_by}, status= 'approved', date_evaluated= CURRENT_TIMESTAMP, proof_billing= '${data.proof_billing}'`)
                                        .condition(`WHERE id= ${adopt.docu_id}`)
                                        .build();
                }
                else {
                    let docu = null;
                    if((await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${adopt.furr_parent_id}`).build()).rowCount > 0) {
                        docu = (await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${adopt.furr_parent_id}`).build()).rows[0];
                        await new Builder(`tbl_documents`)
                                            .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', 
                                                                evaluated_by= ${data.evaluated_by}, status= 'approved', date_evaluated= CURRENT_TIMESTAMP, proof_billing= '${data.proof_billing}'`)
                                            .condition(`WHERE id= ${docu.id}`)
                                            .build();
                    }
                    else {
                        docu = (await new Builder(`tbl_documents`)
                                                            .insert({ columns: `series_no, furr_parent_id, valid_id, picture, pet_cage, evaluated_by, status, date_filed, date_evaluated, proof_billing`, 
                                                                            values: `'${global.randomizer(7)}', ${adopt.furr_parent_id}, '${data.valid_id}', '${data.picture}', '${data.pet_cage}', 
                                                                                            ${data.evaluated_by}, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '${data.proof_billing}'` })
                                                            .condition(`RETURNING id`)
                                                            .build()).rows[0];
                    }
                    
                    let sched = (await new Builder(`tbl_schedule`)
                                                            .insert({ columns: `series_no, furr_parent_id, evaluated_by, status, date_filed, date_evaluated`, 
                                                                            values: `'${global.randomizer(7)}', ${adopt.furr_parent_id}, ${data.evaluated_by}, 'approved', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP` })
                                                            .condition(`RETURNING id`)
                                                            .build()).rows[0];
                                                    
                    await new Builder(`tbl_services`).update(`docu_id= ${docu.id}, schedule_id= ${sched.id}`).condition(`WHERE id= ${adopt.id}`).build();
                }

                return { result: 'success', message: 'Successfully saved!', id: adopt.id }
            default:
                if((await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${data.id}`).build()).rowCount > 0) {
                    let docu = (await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${data.id}`).build()).rows[0];
                    await new Builder(`tbl_documents`).update(`status= 'pending', date_filed= CURRENT_TIMESTAMP`).condition(`WHERE id= ${docu.id}`).build();

                    let adopt = (await new Builder(`tbl_services`)
                                                            .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, type, status, date_filed`, 
                                                                            values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docu.id}, 'adoption', 'pending', CURRENT_TIMESTAMP` })
                                                            .condition(`RETURNING id`)
                                                            .build()).rows[0];

                    return { result: 'success', message: 'Successfully saved!', id: adopt.id }
                }
                else {
                    let docu = (await new Builder(`tbl_documents`)
                                                            .insert({ columns: `series_no, furr_parent_id, status, date_filed`, values: `'${global.randomizer(7)}', ${data.id}, 'pending', CURRENT_TIMESTAMP` })
                                                            .condition(`RETURNING id`)
                                                            .build()).rows[0];
                                                    
                    let adopt = (await new Builder(`tbl_services`)
                                                            .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, type, status, date_filed`, 
                                                                            values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docu.id}, 'adoption', 'pending', CURRENT_TIMESTAMP` })
                                                            .condition(`RETURNING id`)
                                                            .build()).rows[0];

                    return { result: 'success', message: 'Successfully saved!', id: adopt.id }
                }
        }
    }
}

module.exports = Documents;