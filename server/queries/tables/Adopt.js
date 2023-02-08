// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
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

    list = async () => {
        return (await new Builder(`tbl_adopt AS adpt`)
                                        .select(`adpt.id, pet.photo, adpt.series_no, adptr.email, adptr.fname, adptr.lname, adpt.status, adpt.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `adpt.adopter_id = adptr.id`, type: `LEFT` })
                                        .join({ table: `tbl_pets AS pet`, condition: `adpt.pet_id = pet.id`, type: `LEFT` })
                                        .condition(`ORDER BY adpt.date_created DESC`)
                                        .build()).rows;
    }
}

module.exports = Adopt;