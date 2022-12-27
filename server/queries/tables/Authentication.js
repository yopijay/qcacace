// Custom functions
const Builder = require('../../functions/builder');

class Authentication {
    constructor(data) { this.data = data }

    login = async () => {
        let email = await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}'`).build();
        let verified = await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}' AND email_verified= 1`).build();
        let creds = await new Builder(`tbl_users`).select().condition(`WHERE email= '${(this.data).email}' AND password= '${btoa((this.data).password)}'`).build();

        if(email.rowCount === 1) {
            if(verified.rowCount === 1) {
                if(creds.rowCount === 1) {
                    // if (creds.rows[0].is_logged === 0) {  -
                    let logged_in = await new Builder(`tbl_users`).select().condition(`WHERE id= ${creds.rows[0].id}`).build();
                    return { result: 'success', message: { id: btoa(logged_in.rows[0].id), isLogged: logged_in.rows[0].is_logged } }
                    // }
                    // else { return { result: 'error', error: [{ name: 'email', message: 'This account is already active on another device, please log out of this one first!' }] } }
                }
                else { return { result: 'error', error: [{ name: 'password', message: 'Incorrect password!' }] } }
            }
            else {  return { result: 'error', error: [{ name: 'email', message: 'Email is not yet verified!' }] } }
        }
        else { return { result: 'error', error: [{ name: 'email', message: 'Email doesn`t exist!' }] } }
    }
}

module.exports = Authentication;