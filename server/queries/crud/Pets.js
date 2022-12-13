// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Pets {
    constructor(query, data = null) { this.query = query; this.data = data; }
    specific = async () => { return (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${this.query}`).build()).rows; }
    list = async () => { return (await new Builder(`tbl_pets`).select().condition(this.query).build()).rows; }
    dropdown = async () => { return (await new Builder('tbl_pets').select(`id, series_no AS name`).condition(this.query).build()).rows; } // For dropdowns
    dropdown_by = async () => { return (await new Builder('tbl_pets').select(`id, name`).condition(`WHERE pet_category_id= ${this.data.query} ORDER BY date_created DESC`).build()).rows; }

    save = async () => {
        let ordered_cols = [ 'category_id', 'breed_id', 'name', 'gender', 'age', 'size', 'color', 'tags', 'description' ];
        let cols = global.form(ordered_cols, this.data).cols;
        let  vals = global.form(ordered_cols, this.data).vals;
        
        await new Builder(`tbl_pets`).insert(`series_no, ${cols}, status, created_by, date_created`, `'${global.randomizer(7)}', ${vals}, 1, ${(this.data).created_by}, CURRENT_TIMESTAMP`).build();
        return { result: 'success', message: 'Successfully saved!' }
    }

    update = async () => {
        let pet = (await new Builder(`tbl_pets`).select().condition(`WHERE id= ${(this.data).id}`).build()).rows[0];
        
        if(global.checkifsame(pet.breed_id, (this.data).breed_id)) { await new Builder(`tbl_pets`).update(`breed_id= ${(this.data).breed_id}`).condition(`WHERE id= ${pet.id}`).build(); }
        
        if(global.checkifsame(pet.name !== null && pet.name !== '' ? (pet.name).toUpperCase() : null, (this.data).name !== null && (this.data).name !== '' ? ((this.data).name).toUpperCase() : null)) {
            await new Builder(`tbl_pets`).update(`name= ${(this.data).name !== null && (this.data).name !== '' ? `'${((this.data).name).toUpperCase()}'` : null}`).condition(`WHERE id= ${pet.id}`).build();
        }
        
        if(global.checkifsame(pet.gender, (this.data).gender)) { await new Builder(`tbl_pets`).update(`gender= '${(this.data).gender}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.checkifsame((pet.age).toUpperCase(), ((this.data).age).toUpperCase())) { await new Builder(`tbl_pets`).update(`age= '${(this.data).age}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.checkifsame((pet.size).toUpperCase(), ((this.data).size).toUpperCase())) { await new Builder(`tbl_pets`).update(`size= '${(this.data).size}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.checkifsame((pet.color).toUpperCase(), ((this.data).color).toUpperCase())) { await new Builder(`tbl_pets`).update(`color= '${(this.data).color}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.checkifsame((pet.tags).toUpperCase(), ((this.data).tags).toUpperCase())) { await new Builder(`tbl_pets`).update(`tags= '${(this.data).tags}'`).condition(`WHERE id= ${pet.id}`).build(); }
        if(global.checkifsame((pet.description).toUpperCase(), ((this.data).description).toUpperCase())) { await new Builder(`tbl_pets`).update(`description= '${(this.data).description}'`).condition(`WHERE id= ${pet.id}`).build(); }


        await new Builder(`tbl_pets`).update(`updated_by= ${(this.data).updated_by}, date_updated= CURRENT_TIMESTAMP`).condition(`WHERE id= ${pet.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Pets;