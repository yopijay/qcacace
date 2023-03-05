// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class MissingPets {
    specific = async (id) => { return (await new Builder(`tbl_missing_pets`).select().condition(`WHERE id= ${id}`).build()).rows; }
    
    search = async  (data) => {
        return (await new Builder(`tbl_missing_pets AS mp`)
                                        .select(`mp.id, mp.series_no, ctgy.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, 
                                                        mp.color, mp.owner_contact_no, mp.gender, mp.photo, mp.date_created`)
                                        .join({ table: `tbl_category AS ctgy`, condition: `mp.category_id = ctgy.id`, type: `LEFT` })
                                        .join({ table: `tbl_breed AS brd`, condition: `mp.breed_id = brd.id`, type: `LEFT` })
                                        .join({ table: `tbl_coat AS coat`, condition: `mp.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `mp.life_stages_id = ls.id`, type: `LEFT` })
                                        .condition(`WHERE mp.series_no LIKE '%${data.condition}%' OR ctgy.name LIKE '%${data.condition}%'  OR brd.name LIKE '%${data.condition}%'
                                                            OR coat.name LIKE '%${data.condition}%' OR ls.name LIKE '%${data.condition}%' OR mp.gender LIKE '%${data.condition}%'
                                                            ORDER BY mp.date_created DESC`)
                                        .build()).rows;
    }

    list = async () => {
        return (await new Builder(`tbl_missing_pets AS mp`)
                                        .select(`mp.id, mp.series_no, ctgy.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, 
                                                        mp.color, mp.owner_contact_no, mp.gender, mp.photo, mp.date_created`)
                                        .join({ table: `tbl_category AS ctgy`, condition: `mp.category_id = ctgy.id`, type: `LEFT` })
                                        .join({ table: `tbl_breed AS brd`, condition: `mp.breed_id = brd.id`, type: `LEFT` })
                                        .join({ table: `tbl_coat AS coat`, condition: `mp.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `mp.life_stages_id = ls.id`, type: `LEFT` })
                                        .condition(`ORDER BY mp.date_created DESC`)
                                        .build()).rows;
    }

    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        let emails = (await new Builder(`tbl_subscribers`).select(`email`).build()).rows;

        await new Builder(`tbl_missing_pets`)
                            .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, color, description, 
                                                            owner_contact_no, photo, created_by, date_created`, 
                                            values: `'${data.series_no}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}',
                                                            '${data.color}', ${data.description !== '' ? `'${(data.description).toUpperCase()}'` : null},
                                                            '${data.owner_contact_no}', '${data.photo}', ${data.created_by}, CURRENT_TIMESTAMP` })
                            .build();

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Inform natin si subscriber about sa missing pet na ni-post natin if meron syang nakita or what,`,
                
                outro: 'Please contact me for additional help.'
            }
        });

        //emails.forEach(data => transporter.sendMail({ from: global.USER, to: data.email, subject: `Missing Pets`, html: mail }));
        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async (data) => {
        await new Builder(`tbl_missing_pets`)
                            .update(`category_id= ${data.category_id}, breed_id= ${data.breed_id}, coat_id= ${data.coat_id}, life_stages_id= ${data.life_stages_id}, 
                                            gender= '${data.gender}', color= '${(data.color).toUpperCase()}', description= ${data.description !== '' ? `'${(data.description).toUpperCase()}'` : null},
                                            owner_contact_no= '${data.owner_contact_no}', photo= '${data.photo}', updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${data.id}`)
                            .build();

        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = MissingPets