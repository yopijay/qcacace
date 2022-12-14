// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class AdoptDocuments {
    constructor(query, data = null) { this.query = query; this.data = data; }
    specific = async () => { return (await new Builder(`tbl_adopt_documents`).select().condition(`WHERE id= ${this.query}`).build()).rows; }
}

module.exports = AdoptDocuments;