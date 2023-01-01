// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Users {
    login = async (data) => {
        let email = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build();
        let  verified = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND is_email_verified= 1`).build();
        let creds = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND password= '${data.password}'`).build();

        if(email.rowCount === 1) {
            if(verified.rowCount === 1) {
                if(creds.rowCount === 1) {
                    if(creds.rows[0].is_logged === 0) {
                        let logged_in = await new Builder(`tbl_users`).update(`is_logged= 1`).condition(`WHERE id= ${creds.rows[0].id} RETURNING id`).build();
                        return { result: 'success', message: { id: btoa(logged_in.rows[0].id) } }
                    }
                    else { return { result: 'error', error: [{ name: 'email', message: 'Account already used in another device' }] } }
                }
                else { return { result: 'error', error: [{ name: 'password', message: 'Incorrect password!' }] } }
            }
            else { return { result: 'error', error: [{ name: 'email', message: 'Email is not yet verified!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email doesn`t exist!' }] } }
    }

    logout = async (data) => {
        await new Builder(`tbl_users`).update(`is_logged= 0`).condition(`WHERE id= ${atob(data.id)}`).build();
        return { result: 'success', message: 'Successfully logged out!' }
    }

    profile = async (id) => {
        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.*, info.fname, info.mname, info.lname, info.suffix, info.gender, info.address, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .condition(`WHERE usr.id= ${id}`)
                                        .build()).rows;
    }

    dashboard = async () => {
        return {
            total: (await new Builder(`tbl_users`).select(`COUNT(*)`).build()).rows[0].count,
            active: (await new Builder(`tbl_users`).select(`COUNT(*)`).condition(`WHERE status= 1`).build()).rows[0].count,
            inactive: (await new Builder(`tbl_users`).select(`COUNT(*)`).condition(`WHERE status= 0`). build()).rows[0].count
        }
    }

    list = async (query) => {
        let _query = JSON.parse(query.condition);

        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.status, usr.date_created, info.fname, info.mname, info.lname, info.suffix, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .condition(`${_query.condition} EXCEPT SELECT usr.id, usr.series_no, usr.email, usr.user_level, usr.status, usr.date_created, info.fname, info.mname, info.lname, info.suffix, info.avatar FROM tbl_users AS usr
                                                            LEFT JOIN tbl_users_info AS info ON info.user_id = usr.id WHERE usr.id= ${atob(_query.except)} ORDER BY 6 DESC`)
                                        .build()).rows;
    }

    specific = async (id) => {
        // console.log(id);
    }

    save = async (data) => {
        if(!((await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0)) {
            if(!((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0)) {
                let usr = await new Builder(` tbl_users`)
                                                    .insert({ columns: `series_no, email, password, user_level, is_logged, status, created_by, date_created`,
                                                                values: `'${global.randomizer(7)}', '${data.email}', '${data.password}', '${data.user_level}', 0, 1, ${data.created_by}, CURRENT_TIMESTAMP` })
                                                    .condition(`RETURNING id`)
                                                    .build();
                await new Builder(`tbl_users_info`)
                                    .insert({ columns: `user_id, fname, mname, lname, suffix, gender, address, avatar`, 
                                                values: `${usr.rows[0].id}, '${(data.fname).toUpperCase()}', ${data.mname !== undefined && data.mname !== null ? `'${(data.mname).toUpperCase()}'` : null},
                                                            '${(data.lname).toUpperCase()}', ${data.suffix !== undefined && data.suffix !== null ? `'${(data.suffix).toUpperCase()}'` : null}, '${data.gender}',
                                                            ${data.address !== undefined && data.address !== null ? `'${(data.address).toUpperCase()}'` : null}, '${data.avatar}'` })
                                    .build();

                return { result: 'success', message: 'Successfully saved!' }
            }
            else { return { result: 'error', error: [{ name: 'lname', message: 'Name already exist! Change your first name or last name to proceed!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email already used!' }] } }
    }

    update = async (data) => {
        console.log(data);
    }
    // constructor(query, data = null) { this.query = query; this.data = data; }
    // specific = async () => { return (await new Builder(`tbl_users AS usr`).select().join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`).condition(`WHERE usr.id= ${this.query}`).build()).rows; }
    // series = async () => { return (await new Builder('tbl_users').select('COUNT(*)').build()).rows; }

    // profile = async () => {
    //     return (await new Builder(`tbl_users AS usr`)
    //                         .select(`usr.series_no, usr.email, usr.user_level, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address`)
    //                         .join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`)
    //                         .condition(`WHERE usr.id= ${this.query}`)
    //                         .build()).rows;
    // }

    // list = async () => {
    //     return (await new Builder(`tbl_users AS usr`)
    //                                     .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.date_created, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address`)
    //                                     .join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`)
    //                                     .condition(`${JSON.parse(this.query).condition} EXCEPT SELECT usr.id, usr.series_no, usr.email, usr.user_level, usr.date_created, usrnfo.fname, usrnfo.mname, usrnfo.lname, usrnfo.suffix, usrnfo.gender, usrnfo.address FROM tbl_users AS usr
    //                                                         LEFT JOIN tbl_users_info AS usrnfo ON usrnfo.user_id = usr.id WHERE usr.id= ${JSON.parse(this.query).except} ORDER BY 5 DESC`)
    //                                     .build()).rows;
    // }

    // save = async () => {
    // }

    // update = async () => {
    //     let usr = (await new Builder(`tbl_users AS usr`).select().join(`tbl_users_info AS usrnfo`, `usrnfo.user_id = usr.id`).condition(`WHERE usr.id= ${(this.data).id}`).build()).rows[0];
    //     let date = global.date(new Date());
        
    //     if(global.checkifsame(usr.email, (this.data).email)) {
    //         if(!((await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}'`).build()).rowCount > 0)) { await new Builder(`tbl_users`).update(`email= '${(this.data).email}'`).condition(`WHERE id= ${usr.id}`).build(); }
    //         else { return { result: 'error', error: [{ name: 'email', message: 'Email is already used!' }] } }
    //     }

    //     if(global.checkifsame((usr.lname).toUpperCase(), ((this.data).lname).toUpperCase())) {
    //         if(!((await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${((this.data).fname).toUpperCase()}' AND lname= '${((this.data).lname).toUpperCase()}'`).build()).rowCount > 0)) { 
    //             await new Builder(`tbl_users_info`).update(`lname= '${((this.data).lname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build(); 
    //         }
    //         else { return { result: 'error', error: [{ name: 'lname', message: 'Name already exist! Change your first name or last name to proceed!' }] } }
    //     }

    //     if(global.checkifsame(usr.password, (this.data).password)) { await new Builder(`tbl_users`).update(`password= '${(this.data).password}'`).condition(`WHERE id= ${usr.id}`).build(); }
    //     if(global.checkifsame((usr.fname).toUpperCase(), ((this.data).fname).toUpperCase())) { await new Builder(`tbl_users_info`).update(`fname= '${((this.data).fname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build(); }

    //     if(global.checkifsame(usr.mname !== null ? (usr.mname).toUpperCase() : null, (this.data).mname !== null && (this.data).mname !== '' ? ((this.data).mname).toUpperCase() : null)) {
    //         await new Builder(`tbl_users_info`).update(`mname= ${(this.data).mname !== null && (this.data).mname !== '' ? `'${((this.data).mname).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build();
    //     }
        
    //     if(global.checkifsame(usr.gender, (this.data).gender)) { await new Builder(`tbl_users_info`).update(`gender= '${(this.data).gender}'`).condition(`WHERE user_id= ${usr.id}`).build(); }
    //     if(global.checkifsame(usr.user_level, (this.data).user_level)) { await new Builder(`tbl_users`).update(`user_level= '${(this.data).user_level}'`).condition(`WHERE id= ${usr.id}`).build(); }

    //     if(global.checkifsame(usr.address !== null ? (usr.address).toUpperCase() : null, (this.data).address !== null && (this.data).address !== '' ? ((this.data).address).toUpperCase() : null)) {
    //         await new Builder(`tbl_users_info`).update(`address= ${(this.data).address !== null && (this.data).address !== '' ? `'${((this.data).address).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build();
    //     }
        
    //     await new Builder(`tbl_users`).update(`updated_by= ${(this.data).updated_by}, date_updated= '${date}'`).condition(`WHERE id= ${usr.id}`).build();
    //     return { result: 'success', message: 'Successfully updated!' }
    // }
}

module.exports = Users;