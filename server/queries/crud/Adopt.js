// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Adopt {
    constructor(query, data = null) { this.query = query; this.data = data; }
    specific = async () => { return (await new Builder(`tbl_adopt`).select().condition(`WHERE id= ${this.query}`).build()).rows; }
    list = async () => { return (await new Builder(`tbl_adopt AS adpt`).select(`adpt.*, gst.email, gstnfo.fname, gstnfo.lname`).join(`tbl_guest AS gst`, `adpt.requested_by = gst.id`).join(`tbl_guest_info AS gstnfo`, `gstnfo.guest_id = gst.id`).condition(this.query).build()).rows; }

    save = async () => {
        let applicant = (this.data).applicant;
        let document = (this.data).document;
        let exist = await new Builder(`tbl_guest`).select().condition(`WHERE email= '${(this.data).email}'`).build();

        let guest = exist.rowCount > 0 ? exist : await new Builder(`tbl_guest`)
                                                                                            .insert(`series_no, email, contact_no, email_verification_code, email_verified, contact_no_verification_code, contact_no_verified, date_created`,
                                                                                                `'${global.randomizer(7)}', '${applicant.email}', '${applicant.contact_no}', '${global.randomizer(7)}', 0, '${global.randomizer(7)}', 0, CURRENT_TIMESTAMP`)
                                                                                            .condition(`RETURNING id                                             `)
                                                                                            .build();

        await new Builder(`tbl_guest_info`).insert(`guest_id, fname, mname, lname, gender, address`, `${guest.rows[0].id}, '${(applicant.fname).toUpperCase()}', '${(applicant.mname).toUpperCase()}', '${(applicant.lname).toUpperCase()}', '${applicant.gender}', '${(applicant.address).toUpperCase()}'`).build();

        let docs = await new Builder(`tbl_adopt_documents`)
                                            .insert(`series_no, valid_id, owner_picture, area, submitted_by, date_submitted`, 
                                                `'${global.randomizer(7)}', ${document.valid_id !== undefined ? `'${document.valid_id}'` : null}, ${document.owner_picture !== undefined ? `'${document.owner_picture}'` : null}, ${document.area !== undefined ? `'${document.area}'` : null}, ${guest.rows[0].id}, CURRENT_TIMESTAMP`)
                                            .condition(`RETURNING id`)
                                            .build();
        
        let pet = await new Builder(`tbl_pets`).select().condition(`WHERE series_no= '${(this.data).pet.series_no}'`).build();

        let adopt = await new Builder(`tbl_adopt`).insert(`series_no, documents_id, requested_by, pet_id, status, date_requested`, `'${(this.data).series_no}', ${docs.rows[0].id}, ${guest.rows[0].id}, ${pet.rows[0].id}, 'evaluation', CURRENT_TIMESTAMP`).condition(`RETURNING id`).build();
        return { result: 'success', message: 'Successfully saved!', id: adopt.rows[0].id }
    }

    update = async () => {
        switch((this.data).status) {
            case 'evaluation': await new Builder(`tbl_adopt`).update(`approved_by= ${(this.data).updated_by}, status= 'interview', date_approved= CURRENT_TIMESTAMP`).condition(`WHERE id= ${(this.data).id}`).build(); break
            case 'interview': await new Builder(`tbl_adopt`).update(`approved_by= ${(this.data).updated_by}, status= 'payment', date_approved= CURRENT_TIMESTAMP`).condition(`WHERE id= ${(this.data).id}`).build(); break
            case 'payment': await new Builder(`tbl_adopt`).update(`approved_by= ${(this.data).updated_by}, status= 'paid', date_approved= CURRENT_TIMESTAMP`).condition(`WHERE id= ${(this.data).id}`).build(); break
            case 'paid': await new Builder(`tbl_adopt`).update(`approved_by= ${(this.data).updated_by}, status= 'done', date_approved= CURRENT_TIMESTAMP`).condition(`WHERE id= ${(this.data).id}`).build(); break
        }

        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Adopt;