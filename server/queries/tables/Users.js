// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Users {
    specific = async (id) => { return (await new Builder(`tbl_users AS usr`).select().join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: 'LEFT' }).condition(`WHERE usr.id= ${id}`).build()).rows; }

    login = async (data) => {
        let email = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build();
        let verified = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND is_email_verified= 1`).build();
        let creds = await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}' AND password= '${data.password}'`).build();

        if(email.rowCount > 0) {
            if(verified.rowCount > 0) {
                if(creds.rowCount > 0) {
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
            inactive: (await new Builder(`tbl_users`).select(`COUNT(*)`).condition(`WHERE status= 0`).build()).rows[0].count
        }
    }

    search = async (data) => {
        return (await new Builder(`tbl_users AS usr`)
                            .select(`usr.id, usr.user_level, usr.series_no, info.fname, info.mname, info.lname, info.avatar, usr.date_created`)
                            .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: 'LEFT' })
                            .condition(`WHERE usr.user_level LIKE '%${data.condition}%' OR usr.series_no LIKE '%${data.condition}%'
                                                OR info.fname LIKE '%${data.condition}%' OR info.mname LIKE '%${data.condition}%' OR info.lname LIKE '%${data.condition}%'`)
                            .except(`WHERE usr.user_level= 'superadmin' OR usr.id= ${data.id} ORDER BY 8 DESC`)
                            .build()).rows;
    }

    list = async (query) => {
        let _query = JSON.parse(query.condition);

        return (await new Builder(`tbl_users AS usr`)
                                        .select(`usr.id, usr.series_no, usr.email, usr.user_level, usr.status, usr.date_created, info.fname, info.mname, info.lname, info.suffix, info.avatar`)
                                        .join({ table: `tbl_users_info AS info`, condition: `info.user_id = usr.id`, type: `LEFT` })
                                        .condition(`${_query.condition}`)
                                        .except(`WHERE usr.id= ${atob(_query.except)} ORDER BY 6 DESC`)
                                        .build()).rows;
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
        let usr = (await new Builder(`tbl_users AS usr`).select().join({ table: 'tbl_users_info AS info', condition: `info.user_id = usr.id`, type: `LEFT` }).condition(`WHERE usr.id= ${data.id}`).build()).rows[0];
        let date = global.date(new Date());
        
        if(global.compare(usr.email, data.email)) {
            if(!(await new Builder(`tbl_users`).select().condition(`WHERE email= '${data.email}'`).build()).rowCount > 0) {
                await new Builder(`tbl_users`).update(`email= '${data.email}'`).condition(`WHERE id= ${usr.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'email', message: 'Email already used!' }] } }
        }

        if(global.compare(usr.lname, data.lname)) {
            if(!(await new Builder(`tbl_users_info`).select().condition(`WHERE fname= '${(data.fname).toUpperCase()}' AND lname= '${(data.lname).toUpperCase()}'`).build()).rowCount > 0) {
                await new Builder(`tbl_users_info`).update(`lname= '${(data.lname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build();
            }
            else { return { result: 'error', error: [{ name: 'lname', message: 'Name already exist! Please change your last name or first name to proceed!' }] } }
        }
        
        if(global.compare(usr.avatar, data.avatar)) { await new Builder(`tbl_users_info`).update(`avatar= '${data.avatar}'`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.compare(usr.password, data.password)) { await new Builder(`tbl_users`).update(`password= '${data.password}'`).condition(`WHERE id= ${usr.id}`).build(); }
        if(global.compare(usr.fname, data.fname)) { await new Builder(`tbl_users_info`).update(`fname= '${(data.fname).toUpperCase()}'`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.compare(usr.mname, data.mname)) { await new Builder(`tbl_users_info`).update(`mname= ${data.mname !== '' ? `'${(data.mname).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.compare(usr.gender, data.gender)) { await new Builder(`tbl_users_info`).update(`gender= '${data.gender}'`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.compare(usr.user_level, data.user_level)) { await new Builder(`tbl_users`).update(`user_level= '${data.user_level}'`).condition(`WHERE id= ${usr.id}`).build(); }
        if(global.compare(usr.address, data.address)) { await new Builder(`tbl_users_info`).update(`address= ${data.address !== '' ? `'${(data.address).toUpperCase()}'` : null}`).condition(`WHERE user_id= ${usr.id}`).build(); }
        if(global.compare(usr.status, data.status ? 1 : 0)) { await new Builder(`tbl_users`).update(`status= ${data.status === true || data.status === 'true' ? 1 : 0}`).condition(`WHERE id= ${usr.id}`).build(); }

        await new Builder(`tbl_users`).update(`updated_by= ${data.updated_by}, date_updated= '${date}'`).condition(`WHERE id= ${usr.id}`).build();
        return { result: 'success', message: 'Successfully updated!' }
    }
}

module.exports = Users;