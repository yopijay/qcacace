// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Pets {
    specific = async (id) => { return (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${id}`).build()).rows; }

    search = async (data) => {
        return (await new Builder(`tbl_pets AS pet`)
                                        .select(`pet.id, pet.series_no, ctg.name AS company, brd.name AS breed, pet.photo, pet.status, pet.date_created`)
                                        .join({ table: `tbl_pet_category AS ctg`, condition: `pet.pet_category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pet.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`WHERE pet.series_no LIKE '%${data.condition}%' OR ctg.name LIKE '%${data.condition}%' OR brd.name LIKE '%${data.condition}%' ORDER BY pet.date_created DESC`)
                                        .build()).rows;
    }

    list = async () => { 
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_pet_category AS ctg`, condition: `pts.pet_category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`ORDER BY pts.date_created DESC`)
                                        .build()).rows;
    }

    top = async (data) => { 
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, pts.age, pts.size, pts.gender, pts.tags, pts.description, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_pet_category AS ctg`, condition: `pts.pet_category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`ORDER BY pts.date_created DESC LIMIT ${data.limit}`)
                                        .build()).rows;
    }
    
    save = async (data) => {
        await new Builder(`tbl_pets`)
                            .insert({ columns: `series_no, pet_category_id, breed_id, gender, age, color, size, tags, description, photo, status, created_by, date_created`,
                                            values: `'${(data.series_no).toUpperCase()}', ${data.pet_category_id}, ${data.breed_id}, '${data.gender}', '${(data.age).toUpperCase()}', '${(data.color).toUpperCase()}', '${(data.size).toUpperCase()}',
                                                            '${(data.tags).toUpperCase()}', '${(data.description).toUpperCase()}', '${data.photo}', ${data.status ? 1 : 0}, ${data.created_by}, CURRENT_TIMESTAMP` })
                            .build();
        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async (data) => {
        let pet = (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let date = global.date(new Date());

        if(global.compare(pet.pet_category_id, data.pet_category_id)) { await new Builder(`tbl_pets`).update(`pet_category_id= ${data.pet_category_id}`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.breed_id, data.breed_id)) { await new Builder(`tbl_pets`).update(`breed_id= ${data.breed_id}`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.gender, data.gender)) { await new Builder(`tbl_pets`).update(`gender= '${data.gender}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.age, data.age)) { await new Builder(`tbl_pets`).update(`age= '${(data.age).toUpperCase()}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.color, data.color)) { await new Builder(`tbl_pets`).update(`color= '${(data.color).toUpperCase()}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.size, data.size)) { await new Builder(`tbl_pets`).update(`size= '${(data.size).toUpperCase()}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.tags, data.tags)) { await new Builder(`tbl_pets`).update(`tags= '${(data.tags).toUpperCase()}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.description, data.description)) { await new Builder(`tbl_pets`).update(`description= '${(data.description).toUpperCase()}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.photo, data.photo)) { await new Builder(`tbl_pets`).update(`photo= '${data.photo}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.compare(pet.status, data.status ? 1 : 0)) { await new Builder(`tbl_pets`).update(`status= ${data.status === true || data.status === 'true' ? 1 : 0}`).condition(`WHERE id= ${brd.id}`).build(); }

        await new Builder(`tbl_pets`).update(`updated_by= ${data.updated_by}, date_updated= '${date}'`).condition(`WHERE id= ${pet.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Pets;