// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Services {
    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_services`).select().build()).rowCount,
            released: (await new Builder(`tbl_services`).select().condition(`WHERE status= 'released'`).build()).rowCount,
            surrendered: (await new Builder(`tbl_services`).select().condition(`WHERE status= 'surrendered'`).build()).rowCount,
            failed: (await new Builder(`tbl_services`).select().condition(`WHERE status= 'failed'`).build()).rowCount,
        }
    }

    list = async () => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                        srvc.type, srvc.date_filed, srvc.date_evaluated, srvc.type`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .condition(`WHERE srvc.payment_id IS NOT NULL`)
                                        .except(`WHERE (pymnt.status IS NULL OR pymnt.status = 'pending') AND srvc.status = 'pending' ORDER BY 12 DESC`)
                                        .build()).rows;
    }

    search = async (data) => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                        srvc.type, srvc.date_filed, srvc.date_evaluated, srvc.type`)
                                        .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                        .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                        .condition(`WHERE (srvc.series_no LIKE '%${data.condition}%' OR fp.email LIKE '%${(data.condition).toLowerCase()}%' OR 
                                                                fp.fname LIKE '%${data.condition}%' OR fp.lname LIKE '%${data.condition}%') AND srvc.payment IS NOT NULL`)
                                        .except(`WHERE (pymnt.status IS NULL OR pymnt.status = 'pending') AND srvc.status = 'pending' ORDER BY 12 DESC`)
                                        .build()).rows;
    }

    specific = async (id) => {
        return (await new Builder(`tbl_services AS srvc`)
                                        .select(`srvc.id, srvc.series_no, fp.email, fp.fname, fp.mname, fp.lname, fp.contact_no, fp.gender, fp.address, pet.series_no, pet.category_id, pet.breed_id,
                                                        pet.coat_id, pet.life_stages_id, pet.gender AS pet_gender, pet.sterilization, pet.energy_level, pet.weight, pet.color, pet.tags, pet.photo, docs.valid_id, 
                                                        docs.picture, docs.pet_cage, pay.method, pay.transaction_no, app.month, app.day, app.year, srvc.type`)
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
        let _intro = '';

        await new Builder(`tbl_services`)
                            .update(`status= ${data.type === 'surrender' ? `'surrendered'` : `'released'`}, date_evaluated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${data.id}`)
                            .build();

        if(data.type === 'surrender') {
            await new Builder(`tbl_pets`)
                                .update(`status= 1, created_by= ${data.evaluator}, updated_by= ${data.evaluator}, date_created= CURRENT_TIMESTAMP,
                                                date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${data.pet_id}`)
                                .build();
        }
        
        let list = (await new Builder(`tbl_services AS srvc`)
                                            .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                            srvc.type, srvc.date_filed, srvc.date_evaluated, srvc.type`)
                                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                            .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                            .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                            .condition(`WHERE srvc.payment_id IS NOT NULL`)
                                            .except(`WHERE pymnt.status = 'pending' ORDER BY 12 DESC`)
                                            .build()).rows;

        if(data.type === 'adoption') {
            _intro = `Good day! We would like to inform that you can now get your adopted pet at QC Animal Care and Adoption Center  
                            located at Clemente St., Lupang Pangako, Payatas, Quezon City, Philippines. <br><br>

                            To help your pet get released quickly, please bring the following items:<br><br>
                            
                            1. Cage or Pet carrier (depends on the size of pet)<br><br>
                            2. Leash and Collar`;
        }
        else {
            _intro = `Good day! We would like to inform you. We will call you once we are near the pick up location. Thank you!`;
        }
                                    
        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Congratulations`, html: mail });
        return { result: 'success', message: 'Adoption complete!', list: list }
    }

    reject = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let _intro = '';

        let sched = (await new Builder(`tbl_schedule`).select().condition(`WHERE id= ${data.schedule_id}`).build()).rows[0];
        let appnt = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${sched.appointment_id}`).build()).rows[0];

        await new Builder(`tbl_services`).update(`status= 'cancelled', date_evaluated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        if(data.type === 'adoption') {
            await new Builder(`tbl_appointments`).update(`slot= ${parseInt(appnt.slot) + 1}`).condition(`WHERE id= ${sched.appointment_id}`).build();
            await new Builder(`tbl_pets`).update(`is_adopt= 0`).condition(`WHERE id= ${data.pet_id}`).build();
        }

        let list = (await new Builder(`tbl_services AS srvc`)
                                            .select(`srvc.id, pet.photo, srvc.furr_parent_id, srvc.series_no, srvc.schedule_id, srvc.pet_id, fp.email, fp.fname, fp.lname, srvc.status,
                                                            srvc.type, srvc.date_filed, srvc.date_evaluated, srvc.type`)
                                            .join({ table: `tbl_furr_parent AS fp`, condition: `srvc.furr_parent_id = fp.id`, type: `LEFT` })
                                            .join({ table: `tbl_pets AS pet`, condition: `srvc.pet_id = pet.id`, type: `LEFT` })
                                            .join({ table: `tbl_payments AS pymnt`, condition: `srvc.payment_id = pymnt.id`, type: `LEFT` })
                                            .condition(`WHERE srvc.payment_id IS NOT NULL`)
                                            .except(`WHERE pymnt.status = 'pending' ORDER BY 12 DESC`)
                                            .build()).rows;

        if(data.type === 'adoption') {
            _intro = `<b>CANCELLED</b>. Good day! We are sorry to inform you that the releasing of the pet has been canceled. Please wait for our call regarding the reason/s, and refund of payment. Thank you!
            `;
        }
        else {
            _intro = `Good day! We are sorry to inform you that the pick up of the pet has been canceled. Please wait for our call regarding the reason/s, and refund of payment. Thank you!
            `;
        }

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: _intro,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Released Failed`, html: mail });
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

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let errors = [];

        switch(data.type) {
            case 'adoption': break;
            default:
                switch(data.application_type) {
                    case 'walk-in':
                        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) {
                            let fp = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rows[0];
                            let docu = null;

                            if(global.compare(fp.fname, data.fname)) {
                                if((await new Builder(`tbl_furr_parent`)
                                                        .select()
                                                        .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                        .build()).rowCount > 0) {
                                    errors.push({ name: 'lname', message: 'Name already taken!' });
                                }
                            }
                            
                            if(global.compare(fp.lname, data.lname)) {
                                if((await new Builder(`tbl_furr_parent`)
                                                        .select()
                                                        .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                        .build()).rowCount > 0) {
                                    errors.push({ name: 'lname', message: 'Name already taken!' });
                                }
                            }

                            if(global.compare(fp.contact_no, fp.contact_no)) {
                                if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                                    errors.push({ name: 'contact_no', message: 'Contact number already taken!' });
                                } 
                            }

                            if(!(errors.length > 0)) {
                                await new Builder(`tbl_furr_parent`)
                                                    .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                                    lname= '${(data.lname).toUpperCase()}', gender= '${data.gender}',
                                                                    address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, contact_no= '${data.contact_no}', 
                                                                    date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE email= '${data.email}'`)
                                                    .build();
                                                    
                                let pet = (await new Builder(`tbl_pets`)
                                                                    .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight, color,
                                                                                                    tags, photo, is_adopt, status, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}',
                                                                                                    '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${data.color}', '${JSON.stringify(data.tags)}', '${data.photo}',
                                                                                                    0, 0, CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];

                                if((await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${fp.id}`).build()).rowCount > 0) {
                                    docu = (await new Builder(`tbl_documents`)
                                                        .update(`valid_id= '${data.valid_id}', status= 'approved', date_filed= CURRENT_TIMESTAMP`)
                                                        .condition(`WHERE furr_parent_id= ${fp.id} RETURNING id`)
                                                        .build()).rows[0];
                                }
                                else {
                                    docu = (await new Builder(`tbl_documents`)
                                                        .insert({ columns: `series_no, furr_parent_id, valid_id, status, date_filed`, 
                                                                        values: `'${global.randomizer(7)}', ${fp.id}, '${data.valid_id}', 'approved', CURRENT_TIMESTAMP` })
                                                        .condition(`RETURNING id`)
                                                        .build()).rows[0];
                                } 

                                let sched = (await new Builder(`tbl_schedule`)
                                                                        .insert({ columns: `series_no, furr_parent_id, status, date_filed`, values: `'${global.randomizer(7)}', ${fp.id}, 'pending', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                
                                await new Builder(`tbl_services`)
                                                    .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, schedule_id, type, status, date_filed`, 
                                                                    values: `'${global.randomizer(7)}', ${fp.id}, ${pet.id}, ${docu.id}, ${sched.id}, '${data.type}', 'pending', CURRENT_TIMESTAMP` })
                                                    .build();
    
                                let mail = generator.generate({
                                    body: {
                                        name: 'Fur Mom/Dad',
                                        intro: `Good day! Sabihan natin si user na wait yung tawag natin para sa interview nya for surrendering ng pet, and once na nakapasa, mag-e-email tayo sa kanya
                                                    together with the link for payment, since hindi sya satin magbabayad, yung nakalagay dun sa link e input box kung san nya ilalagay yung reference number ng
                                                    payment nya. Then once na-confirm natin yun, another email ulit na magno-notify sa kanya na approved na, and wait nya na lang yung team natin na pumunta
                                                    sa kanila para kunin yun pet!`,
                                        outro: 'Please contact me for additional help.'
                                    }
                                });
    
                                //transporter.sendMail({ from: global.USER, to: data.email, subject: `Pet surrendering Application status`, html: mail });
                                return { result: 'success', message: 'Successfully submitted!' }
                            }
                            else { return { result: 'error', error: errors } }
                        }
                        else {
                            if((await new Builder(`tbl_furr_parent`)
                                                    .select()
                                                    .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                    .build()).rowCount > 0) {
                                errors.push({ name: 'lname', message: 'Name already used!' });
                            }

                            if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                                errors.push({ name: 'contact_no', message: 'Contact no. already used!' });
                            }

                            if(!(errors.length > 0)) {
                                let fp = (await new Builder(`tbl_furr_parent`)
                                                                    .insert({ columns: `series_no, email, fname, mname, lname, gender, address, contact_no, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', '${data.email}', '${(data.fname).toUpperCase()}', 
                                                                                                    ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, '${(data.lname).toUpperCase()}',
                                                                                                    '${data.gender}', ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, '${data.contact_no}',
                                                                                                    CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];
                                let pet = (await new Builder(`tbl_pets`)
                                                                    .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight, color,
                                                                                                    tags, photo, is_adopt, status, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}',
                                                                                                    '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${data.color}', '${JSON.stringify(data.tags)}', '${data.photo}',
                                                                                                    0, 0, CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];
                                let docu = (await new Builder(`tbl_documents`)
                                                                        .insert({ columns: `series_no, furr_parent_id, valid_id, status, date_filed`, 
                                                                                        values: `'${global.randomizer(7)}', ${fp.id}, '${data.valid_id}', 'approved', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                let sched = (await new Builder(`tbl_schedule`)
                                                                        .insert({ columns: `series_no, furr_parent_id, status, date_filed`, values: `'${global.randomizer(7)}', ${fp.id}, 'approved', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                
                                await new Builder(`tbl_services`)
                                                    .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, schedule_id, type, status, date_filed`, 
                                                                    values: `'${global.randomizer(7)}', ${fp.id}, ${pet.id}, ${docu.id}, ${sched.id}, '${data.type}', 'pending', CURRENT_TIMESTAMP` })
                                                    .build();
    
                                let mail = generator.generate({
                                    body: {
                                        name: 'Fur Mom/Dad',
                                        intro: `Good day! Sabihan natin si user na wait yung tawag natin para sa interview nya for surrendering ng pet, and once na nakapasa, mag-e-email tayo sa kanya
                                                    together with the link for payment, since hindi sya satin magbabayad, yung nakalagay dun sa link e input box kung san nya ilalagay yung reference number ng
                                                    payment nya. Then once na-confirm natin yun, another email ulit na magno-notify sa kanya na approved na, and wait nya na lang yung team natin na pumunta
                                                    sa kanila para kunin yun pet!`,
                                        outro: 'Please contact me for additional help.'
                                    }
                                });
    
                                //transporter.sendMail({ from: global.USER, to: data.email, subject: `Pet surrendering Application status`, html: mail });
                                return { result: 'success', message: 'Successfully submitted!' }
                                return { result: 'success', message: 'Successfully submitted!' }
                            }
                            else { return { result: 'error', error: errors } }
                        }

                    default:
                        if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) {
                            let fp = (await new Builder(`tbl_furr_parent`).select().condition(`WHERE email= '${data.email}'`).build()).rows[0];
                            let docu = null;

                            if(global.compare(fp.fname, data.fname)) {
                                if((await new Builder(`tbl_furr_parent`)
                                                        .select()
                                                        .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                        .build()).rowCount > 0) {
                                    errors.push({ name:  'lname', message: 'Name already used!' });
                                }
                            }

                            if(global.compare(fp.lname, data.lname)) {
                                if((await new Builder(`tbl_furr_parent`)
                                                        .select()
                                                        .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                        .build()).rowCount > 0) {
                                    errors.push({ name:  'lname', message: 'Name already used!' });
                                }
                            }

                            if(global.compare(fp.contact_no, data.contact_no)) {
                                if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                                    errors.push({ name: 'contact_no', message: 'Contact no. already used!' })
                                }
                            }

                            if(!(errors.length > 0)) {
                                await new Builder(`tbl_furr_parent`)
                                                    .update(`fname= '${(data.fname).toUpperCase()}', mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null},
                                                                    lname= '${(data.lname).toUpperCase()}', gender= '${data.gender}', address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null},
                                                                    contact_no= '${data.contact_no}', date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE email= '${data.email}'`)
                                                    .build();
                                                    
                                let pet = (await new Builder(`tbl_pets`)
                                                                    .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight, color,
                                                                                                    tags, photo, is_adopt, status, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}',
                                                                                                    '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${data.color}', '${JSON.stringify(data.tags)}', '${data.photo}',
                                                                                                    0, 0, CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];

                                if((await new Builder(`tbl_documents`).select().condition(`WHERE furr_parent_id= ${fp.id}`).build()).rowCount > 0) {
                                    docu = (await new Builder(`tbl_documents`)
                                                        .update(`valid_id= '${data.valid_id}', status= 'pending', date_filed= CURRENT_TIMESTAMP`)
                                                        .condition(`WHERE furr_parent_id= ${fp.id} RETURNING id`)
                                                        .build()).rows[0];
                                }
                                else {
                                    docu = (await new Builder(`tbl_documents`)
                                                                        .insert({ columns: `series_no, furr_parent_id, valid_id, status, date_filed`, 
                                                                                        values: `'${global.randomizer(7)}', ${fp.id}, '${data.valid_id}', 'pending', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                }

                                let sched = (await new Builder(`tbl_schedule`)
                                                                        .insert({ columns: `series_no, furr_parent_id, status, date_filed`, values: `'${global.randomizer(7)}', ${fp.id}, 'pending', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                
                                await new Builder(`tbl_services`)
                                                    .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, schedule_id, type, status, date_filed`, 
                                                                    values: `'${global.randomizer(7)}', ${fp.id}, ${pet.id}, ${docu.id}, ${sched.id}, '${data.type}', 'pending', CURRENT_TIMESTAMP` })
                                                    .build();
    
                                let mail = generator.generate({
                                    body: {
                                        name: 'Fur Mom/Dad',
                                        intro: `Good day! Sabihan natin si user na wait yung tawag natin para sa interview nya for surrendering ng pet, and once na nakapasa, mag-e-email tayo sa kanya
                                                    together with the link for payment, since hindi sya satin magbabayad, yung nakalagay dun sa link e input box kung san nya ilalagay yung reference number ng
                                                    payment nya. Then once na-confirm natin yun, another email ulit na magno-notify sa kanya na approved na, and wait nya na lang yung team natin na pumunta
                                                    sa kanila para kunin yun pet!`,
                                        outro: 'Please contact me for additional help.'
                                    }
                                });
    
                                //transporter.sendMail({ from: global.USER, to: data.email, subject: `Pet surrendering Application status`, html: mail });
                                return { result: 'success', message: 'Successfully submitted!' }
                            }
                            else { return { result: 'error', error: errors } }
                        }
                        else {
                            if((await new Builder(`tbl_furr_parent`)
                                                    .select()
                                                    .condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`)
                                                    .build()).rowCount > 0) {
                                errors.push({ name: 'lname', message: 'Name already used!' });
                            }

                            if((await new Builder(`tbl_furr_parent`).select().condition(`WHERE contact_no= '${data.contact_no}'`).build()).rowCount > 0) {
                                errors.push({ name: 'contact_no', message: 'Contact no. already used!' });
                            }

                            if(!(errors.length > 0)) {
                                let fp = (await new Builder(`tbl_furr_parent`)
                                                                    .insert({ columns: `series_no, email, fname, mname, lname, gender, address, contact_no, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', '${data.email}', '${(data.fname).toUpperCase()}', 
                                                                                                    ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, '${(data.lname).toUpperCase()}',
                                                                                                    '${data.gender}', ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, '${data.contact_no}',
                                                                                                    CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];
                                let pet = (await new Builder(`tbl_pets`)
                                                                    .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight, color,
                                                                                                    tags, photo, is_adopt, status, date_created`, 
                                                                                    values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}',
                                                                                                    '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${data.color}', '${JSON.stringify(data.tags)}', '${data.photo}',
                                                                                                    0, 0, CURRENT_TIMESTAMP` })
                                                                    .condition(`RETURNING id`)
                                                                    .build()).rows[0];
                                let docu = (await new Builder(`tbl_documents`)
                                                                        .insert({ columns: `series_no, furr_parent_id, valid_id, status, date_filed`, 
                                                                                        values: `'${global.randomizer(7)}', ${fp.id}, '${data.valid_id}', 'pending', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                let sched = (await new Builder(`tbl_schedule`)
                                                                        .insert({ columns: `series_no, furr_parent_id, status, date_filed`, values: `'${global.randomizer(7)}', ${fp.id}, 'pending', CURRENT_TIMESTAMP` })
                                                                        .condition(`RETURNING id`)
                                                                        .build()).rows[0];
                                
                                await new Builder(`tbl_services`)
                                                    .insert({ columns: `series_no, furr_parent_id, pet_id, docu_id, schedule_id, type, status, date_filed`, 
                                                                    values: `'${global.randomizer(7)}', ${fp.id}, ${pet.id}, ${docu.id}, ${sched.id}, '${data.type}', 'pending', CURRENT_TIMESTAMP` })
                                                    .build();
    
                                let mail = generator.generate({
                                    body: {
                                        name: 'Fur Mom/Dad',
                                        intro: `Good day! Sabihan natin si user na wait yung tawag natin para sa interview nya for surrendering ng pet, and once na nakapasa, mag-e-email tayo sa kanya
                                                    together with the link for payment, since hindi sya satin magbabayad, yung nakalagay dun sa link e input box kung san nya ilalagay yung reference number ng
                                                    payment nya. Then once na-confirm natin yun, another email ulit na magno-notify sa kanya na approved na, and wait nya na lang yung team natin na pumunta
                                                    sa kanila para kunin yun pet!`,
                                        outro: 'Please contact me for additional help.'
                                    }
                                });
    
                                //transporter.sendMail({ from: global.USER, to: data.email, subject: `Pet surrendering Application status`, html: mail });
                                return { result: 'success', message: 'Successfully submitted!' }
                            }
                            else { return { result: 'error', error: errors } }
                        }
                }
        }
    }
}

module.exports = Services;