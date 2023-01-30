// Custom function
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class LifeStages {
    specific = async (id) => { return (await new Builder(`tbl_life_stages`).select().condition(`WHERE id= ${id}`).build()).rows; }
    dropdown = async (data) => { return (await new Builder(`tbl_life_stages`).select(`id, name`).condition(`WHERE category_id= ${data.id}`).build()).rows; }

    list = async () => {
        return (await new Builder(`tbl_life_stages AS ls`)
                                        .select(`ls.id, ls.series_no, ctg.name AS category, ls.name, ls.date_created`)
                                        .join({ table: `tbl_category AS ctg`, condition: `ls.category_id = ctg.id`, type: `LEFT` })
                                        .condition(`ORDER BY ls.date_created DESC`)
                                        .build()).rows;
    }

    search = async (data) => {
        return (await new Builder(`tbl_life_stages AS ls`)
                                        .select(`ls.id, ls.series_no, ctg.name AS category, ls.name, ls.date_created`)
                                        .join({ table: `tbl_category AS ctg`, condition: `ls.category_id = ctg.id`, type: `LEFT` })
                                        .condition(`WHERE ls.series_no LIKE '%${data.condition}%' OR ls.name LIKE '%${data.condition}%'
                                                            OR ctg.name LIKE '%${data.condition}%' ORDER BY ls.date_created DESC`)
                                        .build()).rows;
    }

    save = async (data) => {
        if(!((await new Builder(`tbl_life_stages`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0)) {
            await new Builder(`tbl_life_stages`)
                                .insert({ columns: `series_no, category_id, name, status, created_by, date_created`, 
                                                values: `'${global.randomizer(7)}', ${data.category_id}, '${(data.name).toUpperCase()}', 1, ${data.created_by}, CURRENT_TIMESTAMP` })
                                .build();

            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: [{ name: 'name', message: 'Coat already exist!' }] } }
    }

    update = async (data) => {
        let ls = (await new Builder(`tbl_life_stages`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let date = global.date(new Date());

        if(global.compare(ls.category_id, data.category_id)) {
            if(!((await new Builder(`tbl_life_stages`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0)) {
                await new Builder(`tbl_life_stages`).update(`category_id= ${data.category_id}`).condition(`WHERE id= ${ls.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'This category already have this ls!' }] } }
        }

        if(global.compare(ls.name, data.name)) {
            if(!((await new Builder(`tbl_life_stages`).select().condition(`WHERE category_id= ${data.category_id} AND name= '${(data.name).toUpperCase()}'`).build()).rowCount > 0)) {
                await new Builder(`tbl_life_stages`).update(`name= '${(data.name).toUpperCase()}'`).condition(`WHERE id= ${ls.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'name', message: 'Coat already exist in this category' }] } }
        }

        if(global.compare(ls.status, data.status ? 1 : 0)) {
            await new Builder(`tbl_life_stages`).update(`status= ${data.status === true || data.status === 'true' ? 1 : 0}`).condition(`WHERE id= ${ls.id}`).build();
        }

        await new Builder(`tbl_life_stages`).update(`updated_by= ${data.updated_by}, date_updated= '${date}'`).condition(`WHERE id= ${ls.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = LifeStages;