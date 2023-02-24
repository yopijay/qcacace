// Libraries
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require("../../functions/builder");

class Surrender {
    save = async (data) => {
        let config = { service: 'gmail', auth: { user: global.USER, pass: global.PASS } }
        let transporter = nodemailer.createTransport(config);
        let generator =  new mailgen({ theme: 'default', product: { name: 'QC Animal Care & Adoption Center', link: 'https://mailgen.js/' } });
        
        await new Builder(`tbl_surrender`)
                            .insert({ columns: `series_no, photo, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight, color, tags, email, fname, mname, lname,
                                                            contact_no, owner_gender, address, reason, valid_id, reference_no, status, date_created`, 
                                            values: `'${global.randomizer(7)}', '${data.photo}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id}, '${data.gender}', '${data.sterilization}',
                                                            '${data.energy_level}', '${data.weight}', '${data.color}', '${JSON.stringify(data.tags)}', '${data.email}', '${(data.fname).toUpperCase()}',
                                                            ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}, '${(data.lname).toUpperCase()}', '${data.contact_no}', '${data.owner_gender}', 
                                                            ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}, '${(data.reason).toUpperCase()}', '${data.valid_id}',
                                                            '${(data.reference_no).toUpperCase()}', 'pending', CURRENT_TIMESTAMP` })
                            .build();

        let mail = generator.generate({
            body: {
                name: 'Fur Mom/Dad',
                intro: `Inform natin si user na na-send na yung application nya for surrendering pet, wait na lang nya yung update para dun sa sched nya ng interview!`,
                outro: 'Please contact me for additional help.'
            }
        });

        transporter.sendMail({ from: global.USER, to: data.email, subject: `Surrender Pets`, html: mail });
        return { result: 'success', message: 'Application sent!' }
    }
}

module.exports = Surrender;