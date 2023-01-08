// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Category {
    list = async () => { return (await new Builder(`tbl_pet_category`).select().condition(`ORDER BY date_created DESC`).build()).rows; }
    search = async (data) => { return (await new Builder(`tbl_pet_category`).select().condition(`WHERE name LIKE '%${data.condition}%' OR series_no LIKE '%${data.condition}%'`).build()).rows; }
    // constructor(query, data = null) { this.query = query; this.data = data; }
    // specific = async () => { return (await new Builder(`tbl_pet_category`).select().condition(`WHERE id= ${this.query}`).build()).rows; }
    // list = async () => { return (await new Builder(`tbl_pet_category`).select().condition(this.query).build()).rows; }
    // dropdown = async () => { return (await new Builder('tbl_pet_category').select(`id, name`).condition(this.query).build()).rows; } // For dropdowns

    // save = async () => {
    //     let name = await new Builder(`tbl_pet_category`).select().condition(`WHERE name= '${((this.data).name).toUpperCase()}'`).build();

    //     if(!(name.rowCount > 0)) {
    //         await new Builder(`tbl_pet_category`).insert(`series_no, name, status, created_by, date_created`, `'${global.randomizer(7)}', '${((this.data).name).toUpperCase()}', 1, ${(this.data).created_by}, CURRENT_TIMESTAMP`).build();
    //         return { result: 'success', message: 'Successfully saved!' }
    //     }
    //     else { return { result: 'error', error: [{ name: 'name', message: 'Pet category is already used!' }] } }
    // }

    // update = async () => {
    //     let ctg = await new Builder(`tbl_pet_category`).select().condition(`WHERE id= ${(this.data).id}`).build();

    //     if(global.checkifsame((ctg.rows[0].name).toUpperCase(), ((this.data).name).toUpperCase())) {
    //         if(!((await new Builder(`tbl_pet_category`).select().condition(`WHERE name= '${((this.data).name).toUpperCase()}'`).build()).rowCount > 0)) { await new Builder(`tbl_pet_category`).update(`name= '${((this.data).name).toUpperCase()}'`).condition(`WHERE id= ${ctg.rows[0].id}`).build(); }
    //         else { return { result: 'error', error: [{ name: 'name', message: 'Pet category is already used!' }] } }
    //     }

    //     await new Builder(`tbl_pet_category`).update(`updated_by= ${(this.data).updated_by}, date_updated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${ctg.rows[0].id}`).build();
    //     return { result: 'success', message: 'Successfully updated!' }
    // }
}

module.exports = Category;