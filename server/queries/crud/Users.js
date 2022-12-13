// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Users {
    constructor(query, data = null) { this.query = query; this.data = data; }
    specific = async () => { return (await new Builder(`tbl_users AS usr`).select().join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`).condition(`WHERE usr.id= ${this.query}`).build()).rows; }
    series = async () => { return (await new Builder('tbl_users').select('COUNT(*)').build()).rows; }

    profile = async () => {
        return (await new Builder(`tbl_users AS usr`)
                            .select(`usr.series_no, usr.email, usr.user_level, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address`)
                            .join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`)
                            .condition(`WHERE usr.id= ${this.query}`)
                            .build()).rows;
    }

    list = async () => {
        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.date_created, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address`)
                                        .join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`)
                                        .condition(`${JSON.parse(this.query).condition} EXCEPT SELECT usr.id, usr.series_no, usr.email, usr.user_level, usr.date_created, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address FROM tbl_users AS usr
                                                            LEFT JOIN tbl_users_info AS usrnfo ON usrnfo.user_id = usr.id WHERE usr.id= ${JSON.parse(this.query).except} ORDER BY 5 DESC`)
                                        .build()).rows;
    }

    save = async () => {
        let ordered_usr = [ 'password', 'user_level' ];
        let ordered_info = [ 'fname', 'mname', 'lname', 'gender', 'address' ];
        let email = (await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}'`).build()).rowCount > 0;
        
        if(!email) {
            if(!((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${((this.data).fname).toUpperCase()}' AND lname= '${((this.data).lname).toUpperCase()}'`).build()).rowCount > 0)) {
                let usr = global.form(ordered_usr, this.data);
                let info = global.form(ordered_info, this.data);

                let _usr = await new Builder(`tbl_users`).insert(`series_no, email, ${usr.cols}, status, created_by, date_created`, `'${global.randomizer(7)}', '${(this.data).email}', ${usr.vals}, 1, ${(this.data).created_by}, CURRENT_TIMESTAMP`).condition(`RETURNING id`).build();
                await new Builder(`tbl_users`).update(`email_verification_code= '${global.randomizer(6)}', email_verified= 1`).condition(`WHERE id= ${_usr.rows[0].id}`).build();
                await new Builder(`tbl_users_info`).insert(`user_id, ${info.cols}`, `${_usr.rows[0].id}, ${info.vals}`).build();

                return { result: 'success', message: 'Successfully saved!' }
            }
            else { return { result: 'error', error: [{ name: 'lname', message: 'Name already exist! Change your first name or last name to proceed!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email already used!' }] } }
    }

    update = async () => {
        let usr = (await new Builder(`tbl_users AS usr`).select().join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`).condition(`WHERE usr.id= ${(this.data).id}`).build()).rows[0];
        let date = global.date(new Date());
        
        if(global.checkifsame(usr.email, (this.data).email)) {
            if(!((await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}'`).build()).rowCount > 0)) { await new Builder(`tbl_users`).update(`email= '${(this.data).email}'`).condition(`WHERE id= ${usr.id}`).build(); }
            else { return { result: 'error', error: [{ name: 'email', message: 'Email is already used!' }] } }
        }

        if(global.checkifsame((usr.lname).toUpperCase(), ((this.data).lname).toUpperCase())) {
            if(!((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${((this.data).fname).toUpperCase()}' AND lname= '${((this.data).lname).toUpperCase()}'`).build()).rowCount > 0)) { 
                await new Builder(`tbl_users_info`).update(`lname= '${((this.data).lname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build(); 
            }
            else { return { result: 'error', error: [{ name: 'lname', message: 'Name already exist! Change your first name or last name to proceed!' }] } }
        }

        if(global.checkifsame(usr.password, (this.data).password)) { await new Builder(`tbl_users`).update(`password= '${(this.data).password}'`).condition(`WHERE id= ${usr.id}`).build(); }
        if(global.checkifsame((usr.fname).toUpperCase(), ((this.data).fname).toUpperCase())) { await new Builder(`tbl_users_info`).update(`fname= '${((this.data).fname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build(); }

        if(global.checkifsame(usr.mname !== null ? (usr.mname).toUpperCase() : null, (this.data).mname !== null && (this.data).mname !== '' ? ((this.data).mname).toUpperCase() : null)) {
            await new Builder(`tbl_users_info`).update(`mname= ${(this.data).mname !== null && (this.data).mname !== '' ? `'${((this.data).mname).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build();
        }
        
        if(global.checkifsame(usr.gender, (this.data).gender)) { await new Builder(`tbl_users_info`).update(`gender= '${(this.data).gender}'`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.checkifsame(usr.user_level, (this.data).user_level)) { await new Builder(`tbl_users`).update(`user_level= '${(this.data).user_level}'`).condition(`WHERE id= ${usr.id}`).build(); }

        if(global.checkifsame(usr.address !== null ? (usr.address).toUpperCase() : null, (this.data).address !== null && (this.data).address !== '' ? ((this.data).address).toUpperCase() : null)) {
            await new Builder(`tbl_users_info`).update(`address= ${(this.data).address !== null && (this.data).address !== '' ? `'${((this.data).address).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build();
        }
        
        await new Builder(`tbl_users`).update(`updated_by= ${(this.data).updated_by}, date_updated= '${date}'`).condition(`WHERE id= ${usr.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Users;