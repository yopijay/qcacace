// Libraires
const nodemailer = require('nodemailer');
const mailgen = require('mailgen');

// Custom functions
const global = require('../../functions/global');
const Builder = require('../../functions/builder');

class Appointment {
    list = async () => { return (await new Builder(`tbl_appointments`).select().condition(`ORDER BY date_created DESC`).build()).rows; }
    specific = async (id) => { return (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${id}`).build()).rows; }
    availabeldates = async(data) => { return (await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.month} AND year= ${data.year}`).build()).rows; }

    save = async (data) => {
        let _errors = [];

        if((await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.month} AND day= ${data.day} AND year= ${data.year}`).build()).rowCount > 0) {
            _errors.push({ name: 'day', message: 'Appointment already exist!' });
        }

        if(!(_errors.length > 0)) {
            await new Builder(`tbl_appointments`)
                                .insert({ columns: `series_no, month, day, year, slot, status, created_by, date_created`, 
                                                values: `'${global.randomizer(7)}', ${data.month}, ${data.day}, ${data.year}, ${data.slot}, ${data.status ? 1 : 0}, ${data.created_by}, CURRENT_TIMESTAMP` })
                                .build();
            
            return { result: 'success', message: 'Successfully saved!' }
        }
        else { return { result: 'error', error: _errors } }
    }

    update = async (data) => {
        let app = (await new Builder(`tbl_appointments`).select().condition(`WHERE id= ${data.id}`).build()).rows[0];
        let _errors = [];

        if(global.compare(app.month, data.month)) {
            if((await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.month} AND day= ${data.day} AND year= ${data.year}`).build()).rowCount > 0) {
                _errors.push({ name: 'day', message: 'Date already exist!' });
            }
        }

        if(global.compare(app.day, data.day)) {
            if((await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.month} AND day= ${data.day} AND year= ${data.year}`).build()).rowCount > 0) {
                _errors.push({ name: 'day', message: 'Date already exist!' });
            }
        }

        if(global.compare(app.year, data.year)) {
            if((await new Builder(`tbl_appointments`).select().condition(`WHERE month= ${data.month} AND day= ${data.day} AND year= ${data.year}`).build()).rowCount > 0) {
                _errors.push({ name: 'day', message: 'Date already exist!' });
            }
        }

        if(!(_errors.length > 0)) {
            await new Builder(`tbl_appointments`)
                                .update(`month= ${data.month}, day= ${data.day}, year= ${data.year}, slot= ${data.slot}, status= ${data.status === true || data.status === 'true' ? 1 : 0},
                                                updated_by= ${data.updated_by}, date_updated= CURRENT_TIMESTAMP`)
                                .condition(`WHERE id= ${app.id}`)
                                .build();
            
            return { result: 'success', message: 'Successfully updated!' }
        }
        else { return { result: 'error', error: _errors } }
    }
}

module.exports = Appointment;