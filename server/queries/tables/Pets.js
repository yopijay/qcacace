// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Pets {
    specific = async (id) => { return (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${id}`).build()).rows; }

    search = async (data) => {
        return (await new Builder(`tbl_pets AS pet`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, 
                                                        pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`WHERE pet.series_no LIKE '%${data.condition}%' OR ctg.name LIKE '%${data.condition}%' OR brd.name LIKE '%${data.condition}%' ORDER BY pet.date_created DESC`)
                                        .build()).rows;
    }

    // recommend = async (data) => {
    //     let ctgy = (await new Builder(`tbl_pet_category`).select(`name`).condition(`WHERE id= ${data.pet_category_id}`).build()).rows[0];
    //     let brd = (await new Builder(`tbl_breed`).select(`name`).condition(`WHERE id= ${data.breed_id}`).build()).rows[0];
        
    //     return (await new Builder(`tbl_pets AS pts`)
    //                                     .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, pts.age, pts.size, pts.gender, pts.tags, pts.description, pts.photo, pts.status, pts.date_created`)
    //                                     .join({ table: `tbl_pet_category AS ctg`, condition: `pts.pet_category_id = ctg.id`, type: 'LEFT' })
    //                                     .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
    //                                     .condition(`WHERE ctg.name LIKE '%${ctgy.name}%' AND brd.name LIKE '%${brd.name}%' AND pts.gender LIKE '%${data.gender}%' 
    //                                                         OR pts.tags LIKE '%${JSON.stringify(data.tags)}%' OR (pts.age LIKE '%${(data.age).toUpperCase()}%' OR pts.size LIKE '%${(data.size).toUpperCase()}%')
    //                                                         ORDER BY pts.date_created ASC LIMIT 3`)
    //                                     .build()).rows;
    // }

    list = async () => { 
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, 
                                                        pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`ORDER BY pts.date_created DESC`)
                                        .build()).rows;
    }

    top = async (data) => { 
        return (await new Builder(`tbl_pets AS pts`)
                                        .select(`pts.id, pts.series_no, ctg.name AS category, brd.name AS breed, coat.name AS coat, ls.name AS stage, pts.weight, 
                                                        pts.gender, pts.tags, pts.photo, pts.status, pts.date_created`)
                                        .join({ table: `tbl_coat AS coat`, condition: `pts.coat_id = coat.id`, type: `LEFT` })
                                        .join({ table: `tbl_life_stages AS ls`, condition: `pts.life_stages_id = ls.id`, type: `LEFT` })
                                        .join({ table: `tbl_category AS ctg`, condition: `pts.category_id = ctg.id`, type: 'LEFT' })
                                        .join({ table: `tbl_breed AS brd`, condition: `pts.breed_id = brd.id`, type: 'LEFT' })
                                        .condition(`ORDER BY pts.date_created DESC LIMIT ${data.limit}`)
                                        .build()).rows;
    }
    
    save = async (data) => {
        await new Builder(`tbl_pets`)
                            .insert({ columns: `series_no, category_id, breed_id, coat_id, life_stages_id, gender, sterilization, energy_level, weight,
                                            color, tags, photo, is_adopt, status, created_by ,date_created`, 
                                            values: `'${global.randomizer(7)}', ${data.category_id}, ${data.breed_id}, ${data.coat_id}, ${data.life_stages_id},
                                                            '${data.gender}', '${data.sterilization}', '${data.energy_level}', '${data.weight}', '${(data.color).toUpperCase()}',
                                                            '${JSON.stringify(data.tags)}', '${data.photo}', 0, 1, ${data.created_by}, CURRENT_TIMESTAMP` })
                            .build();

        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async (data) => {
        let pet = (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        
        await new Builder(`tbl_pets`)
                            .update(`category_id= ${data.category_id}, breed_id= ${data.breed_id}, coat_id= ${data.coat_id}, life_stages_id= ${data.life_stages_id}, gender= '${data.gender}', 
                                            sterilization= '${data.sterilization}', energy_level= '${data.energy_level}', weight= '${data.weight}', color= '${(data.color).toUpperCase()}',
                                            tags= '${JSON.stringify(data.tags)}', photo= '${data.photo}', updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                            .condition(`WHERE id= ${pet.id}`)
                            .build();

        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Pets;