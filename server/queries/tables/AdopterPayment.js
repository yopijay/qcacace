// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterPayment {
    list = async () => {
        return (await new Builder(`tbl_adopter_payment AS pymnt`)
                                        .select(`pymnt.id, pymnt.series_no, pymnt.transaction_no, adptr.email, adptr.contact_no, adptr.fname, adptr.lname, pymnt.status, pymnt.date_created`)
                                        .join({ table: `tbl_adopter AS adptr`, condition: `pymnt.adopter_id = adptr.id`, type: `LEFT` })
                                        .condition(`ORDER BY pymnt.date_created DESC`)
                                        .build()).rows;
    }
}

module.exports = AdopterPayment;