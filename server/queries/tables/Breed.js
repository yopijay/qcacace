// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Breed {
    list = async () => { return (await new Builder(`tbl_breed AS brd`).select(`brd.id, brd.series_no, ctg.name AS pet_category, brd.name, brd.date_created`).join({ table: `tbl_pet_category AS ctg`, condition: `brd.pet_category_id = ctg.id`, type: 'LEFT' }).condition(`ORDER BY brd.date_created DESC`).build()).rows; }
    specific = async (id) => { return (await new Builder(`tbl_breed`).select().condition(`WHERE id= ${id}`).build()).rows; }

    dashboard = async() => {
        let dog = (await new Builder(`tbl_pet_category`).select().condition(`WHERE name= 'DOG' AND status= 1`).build()).rows[0];
        let cat = (await new Builder(`tbl_pet_category`).select().condition(`WHERE name= 'CAT' AND status= 1`).build()).rows[0];

        return {
            others: (await new Builder(`tbl_breed`).select(`COUNT(*)`).build()).rows[0].count,
            dogs: (await new Builder(`tbl_breed AS brd`).select(`COUNT(brd.*)`).condition(`WHERE brd.pet_category_id= ${dog.id}`).build()).rows[0].count,
            cats: (await new Builder(`tbl_breed AS brd`).select(`COUNT(brd.*)`).condition(`WHERE brd.pet_category_id= ${cat.id}`).build()).rows[0].count
        }
    }

    search = async (data) => { 
        return (await new Builder(`tbl_breed AS brd`)
                                        .select(`brd.id, brd.series_no, ctg.name AS pet_category, brd.name, brd.date_created`).
                                        join({ table: `tbl_pet_category AS ctg`, condition: `brd.pet_category_id = ctg.id`, type: 'LEFT' })
                                        .condition(`WHERE brd.series_no LIKE '%${data.condition}%' OR brd.name LIKE '%${data.condition}%' OR ctg.name LIKE '%${data.condition}%' ORDER BY brd.date_created DESC`)
                                        .build()).rows;
    }

    save = async (data) => {
        if(!(await new Builder(`tbl_breed`).select().condition(`WHERE pet_category_id= ${data.pet_category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
            await new Builder(`tbl_breed`)
                                .insert({ columns: `series_no, pet_category_id, name, status, created_by, date_created`,
                                                values: `'${(data.series_no).toUpperCase()}', ${data.pet_category_id}, '${(data.name).toUpperCase()}',  ${data.status ? 1 : 0}, ${data.created_by}, CURRENT_TIMESTAMP` })
                                .build();
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: [{ name: 'name', message: 'Breed already exist! Change your breed name or choose another pet category!' }] } }
    }

    update = async (data) => {
        let brd = (await new Builder(`tbl_breed`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let date = global.date(new Date());

        if(global.compare(brd.pet_category_id, data.pet_category_id)) {
            if(!(await new Builder(`tbl_breed`).select().condition(`WHERE pet_category_id= ${data.pet_category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
                await new Builder(`tbl_breed`).update(`pet_category_id= ${data.pet_category_id}`).condition(`WHERE id= ${brd.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'pet_category_id', message: 'Breed already exist in this pet category!' }] } }
        }

        if(global.compare(brd.name, data.name)) {
            if(!(await new Builder(`tbl_breed`).select().condition(`WHERE pet_category_id= ${data.pet_category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0) {
                await new Builder(`tbl_breed`).update(`name= '${(data.name).toUpperCase()}'`).condition(`WHERE id= ${brd.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'name', message: 'Breed already exist in this pet category! Please change your breed name or choose another pet category' }] } }
        }

        if(global.compare(brd.status, data.status ? 1 : 0)) { await new Builder(`tbl_breed`).update(`status= ${data.status === true || data.status === 'true' ? 1 : 0}`).condition(`WHERE id= ${brd.id}`).build(); }

        await new Builder(`tbl_breed`).update(`updated_by= ${data.updated_by}, date_created= '${date}'`).condition(`WHERE id= ${brd.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Breed;