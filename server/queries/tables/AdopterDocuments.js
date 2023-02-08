// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterDocuments {
    specific = async (id) => { 
        return (await new Builder(`tbl_adopter_documents`)
                                        .select()
                                        .condition(`WHERE adopter_id= ${id}`).build()).rows; 
    }

    list = async () => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`MAX(adpt.id) AS id, MAX(adpt.adopter_id) AS adopter_id, MAX(adpt.pet_id) AS pet_id, adpt.docu_id, MAX(adpt.payment_id) AS payment_id, 
                                                        MAX(adpt.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture, 
                                                        MAX(docu.pet_cage) AS pet_cage, MAX(adptr.email) AS email, MAX(adptr.fname) AS fname, MAX(adptr.lname) AS lname,
                                                        MAX(docu.status) AS status, MAX(docu.date_created) AS date_created`)
                                        .join({ table: `tbl_adopter_documents AS docu`, condition: `adpt.docu_id = docu.id`, type: `LEFT` })
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`GROUP BY adpt.docu_id ORDER BY date_created DESC`)
                                        .build()).rows;
    }

    approve = async (data) => {
        // let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        // let transporter = nodemailer.createTransport(config);
        // let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_documents`).update(`status= 'approved', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`MAX(adpt.id) AS id, MAX(adpt.adopter_id) AS adopter_id, MAX(adpt.pet_id) AS pet_id, adpt.docu_id, MAX(adpt.payment_id) AS payment_id, 
                                                            MAX(adpt.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture, 
                                                            MAX(docu.pet_cage) AS pet_cage, MAX(adptr.email) AS email, MAX(adptr.fname) AS fname, MAX(adptr.lname) AS lname,
                                                            MAX(docu.status) AS status, MAX(docu.date_created) AS date_created`)
                                            .join({ table: `tbl_adopter_documents AS docu`, condition: `adpt.docu_id = docu.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .condition(`GROUP BY adpt.docu_id ORDER BY date_created DESC`)
                                            .build()).rows;

        // let mail = generator.generate({
        //     body: {
        //         name: 'Fur Mom/Dad',
        //         intro: `<b>PASSED</b>. Notify lang natin si user na na-approve yung documents nya and wait nya na lang yung call natin para sa virtual interview na ni-set nya`,
                
        //         outro: 'Please contact me for additional help.'
        //     }
        // });

        // transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Documents approved!', list: list }
    }

    reject = async (data) => {
        // let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        // let transporter = nodemailer.createTransport(config);
        // let generator =  new mailgen({ theme: 'default', product: { name: 'Mailgen', link: 'https://mailgen.js/' } });

        await new Builder(`tbl_adopter_documents`).update(`status= 'reject', date_created= CURRENT_TIMESTAMP`).condition(`WHERE id= ${data.id}`).build();

        let list = (await new Builder(`tbl_adopt AS adpt`)
                                            .select(`MAX(adpt.id) AS id, MAX(adpt.adopter_id) AS adopter_id, MAX(adpt.pet_id) AS pet_id, adpt.docu_id, MAX(adpt.payment_id) AS payment_id, 
                                                            MAX(adpt.schedule_id) AS schedule_id, MAX(docu.series_no) AS series_no, MAX(docu.valid_id) AS valid_id, MAX(docu.picture) AS picture, 
                                                            MAX(docu.pet_cage) AS pet_cage, MAX(adptr.email) AS email, MAX(adptr.fname) AS fname, MAX(adptr.lname) AS lname,
                                                            MAX(docu.status) AS status, MAX(docu.date_created) AS date_created`)
                                            .join({ table: `tbl_adopter_documents AS docu`, condition: `adpt.docu_id = docu.id`, type: `LEFT` })
                                            .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                            .condition(`GROUP BY adpt.docu_id ORDER BY date_created DESC`)
                                            .build()).rows;

        // let mail = generator.generate({
        //     body: {
        //         name: 'Fur Mom/Dad',
        //         intro: `<b>REJECTED</b>. Inform nyo si user na na-reject yung application nya dahil may mali sa mga docu nya or hindi pumasa yung mga sinend nyan pic.`,
                
        //         outro: 'Please contact me for additional help.'
        //     }
        // });

        // transporter.sendMail({ from: global.USER, to: data.email, subject: `Application status`, html: mail });
        return { result: 'success', message: 'Documents rejected!', list: list }
    }

    save = async (data) => {
        if((await new Builder(`tbl_adopter_documents`).select().condition(`WHERE adopter_id= ${data.id}`).build()).rowCount > 0) {
            let docu = (await new Builder(`tbl_adopter_documents`).select().condition(`WHERE adopter_id= ${data.id}`).build()).rows[0];

            if(global.compare(docu.valid_id, data.valid_id) || global.compare(docu.picture, data.picture) || global.compare(docu.pet_cage, data.pet_cage)) {
                let docs = (await new Builder(`tbl_adopter_documents`)
                                                    .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', status= 'pending', date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE adopter_id= ${data.id} RETURNING id`)
                                                    .build()).rows[0];
                let adpt = (await new Builder(`tbl_adopt`)
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status, date_created`, 
                                                                    values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending', CURRENT_TIMESTAMP` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];
                
                return { result: 'succcess', message: 'Successfully saved!', id: adpt.id }
            }
            else {
                let docs = (await new Builder(`tbl_adopter_documents`)
                                                    .update(`status= 'pending', date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE adopter_id= ${data.id} RETURNING id`)
                                                    .build()).rows[0];

                let adpt = (await new Builder(`tbl_adopt`)
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status, date_created`, 
                                                                    values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending', CURRENT_TIMESTAMP` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];
                
                return { result: 'succcess', message: 'Successfully saved!', id: adpt.id }
            }
        }
        else {
            let docs = (await new Builder(`tbl_adopter_documents`)
                                                    .insert({ columns: `series_no, adopter_id, valid_id, picture, pet_cage, status, date_created`, 
                                                                    values: `'${global.randomizer(7)}', ${data.id}, '${data.valid_id}', '${data.picture}', '${data.pet_cage}', 'pending', CURRENT_TIMESTAMP` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];

            let adpt = (await new Builder(`tbl_adopt`)
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status, date_created`, 
                                                                    values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending', CURRENT_TIMESTAMP` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];
            
            return { result: 'succcess', message: 'Successfully saved!', id: adpt.id }
        }
    }
}

module.exports = AdopterDocuments;