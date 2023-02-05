// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdopterDocuments {
    specific = async (id) => { return (await new Builder(`tbl_adopter_documents`).select().condition(`WHERE adopter_id= ${id}`).build()).rows; }

    save = async (data) => {
        if((await new Builder(`tbl_adopter_documents`).select().condition(`WHERE adopter_id= ${data.id}`).build()).rowCount > 0) {
            let docu = (await new Builder(`tbl_adopter_documents`).select().condition(`WHERE adopter_id= ${data.id}`).build()).rows[0];

            if(global.compare(docu.valid_id, data.valid_id) || global.compare(docu.picture, data.picture) || global.compare(docu.pet_cage, data.pet_cage)) {
                let docs = (await new Builder(`tbl_adopter_documents`)
                                                    .update(`valid_id= '${data.valid_id}', picture= '${data.picture}', pet_cage= '${data.pet_cage}', status= 'pending', date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE adopter_id= ${data.id} RETURNING id`)
                                                    .build()).rows[0];
                let adpt = (await new Builder(`tbl_adopt`)
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status`, values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending'` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];
                
                return { result: 'succcess', message: 'Successfully saved!', id: adpt.id }
            }
            else {
                let docs = (await new Builder(`tbl_adopter_documents`)
                                                    .update(`status= '${docu.status}', date_updated= CURRENT_TIMESTAMP`)
                                                    .condition(`WHERE adopter_id= ${data.id} RETURNING id`)
                                                    .build()).rows[0];

                let adpt = (await new Builder(`tbl_adopt`)
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status`, values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending'` })
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
                                                    .insert({ columns: `series_no, adopter_id, pet_id, docu_id, status`, values: `'${global.randomizer(7)}', ${data.id}, ${data.pet_id}, ${docs.id}, 'pending'` })
                                                    .condition(`RETURNING id`)
                                                    .build()).rows[0];
            
            return { result: 'succcess', message: 'Successfully saved!', id: adpt.id }
        }
    }
}

module.exports = AdopterDocuments;