// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Breed {
    constructor(query, data = null) { this.query = query; this.data = data; }
    specific = async () => { return (await new Builder(`tbl_breed`).select().condition(`WHERE id= ${this.query}`).build()).rows; }
    list = async () => { return (await new Builder(`tbl_breed`).select().condition(this.query).build()).rows; }
    dropdown = async () => { return (await new Builder('tbl_breed').select(`id, name`).condition(this.query).build()).rows; } // For dropdowns

    save = async () => {
        let breed = await new Builder(`tbl_breed`).select().condition(`WHERE pet_category_id= ${(this.data).pet_category_id} AND name= '${((this.data).name).toUpperCase()}'`).build();

        if(!(breed.rowCount > 0)) {
            await new Builder(`tbl_breed`).insert(`series_no, pet_category_id, name, status, created_by, date_created`, `'${global.randomizer(7)}', ${(this.data).pet_category_id}, '${((this.data).name).toUpperCase()}', 1, ${(this.data).created_by}, CURRENT_TIMESTAMP`).build();
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: [{ name: 'name', message: 'Breed already used!' }] } }
    }

    update = async () => {
        let brd = await new Builder(`tbl_breed`).select().condition(`WHERE id= ${(this.data).id}`).build();

        if(global.checkifsame((brd.rows[0].name).toUpperCase(), ((this.data).name).toUpperCase())) {
            if(!((await new Builder(`tbl_breed`).select().condition(`WHERE pet_category_id= ${(this.data).pet_category_id} AND name= '${((this.data).name).toUpperCase()}'`).build()).rowCount > 0)) { await new Builder(`tbl_breed`).update(`name= '${((this.data).name).toUpperCase()}'`).condition(`WHERE id= ${brd.rows[0].id}`).build(); }
            else { return { result: 'error', error: [{ name: 'name', message: 'Pet category is already used!' }] } }
        }

        await new Builder(`tbl_breed`).update(`updated_by= ${(this.data).updated_by}, date_updated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${brd.rows[0].id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Breed;