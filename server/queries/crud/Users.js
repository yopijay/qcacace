// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Users {
    constructor(query, data = null) { this.query = query; this.data = data; }

    profile = async () => {
        return (await new Builder(`tbl_users AS usr`)
                            .select(`usr.series_no, usr.email, usr.user_level, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address`)
                            .join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`)
                            .condition(`WHERE usr.id= ${this.query}`)
                            .build()).rows;
    }
}

module.exports = Users;