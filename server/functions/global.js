// Global
const Builder = require("./builder");

const USER = "qcacac2017@gmail.com";
const PASS = "tsljwbtezngavitd";
const checkifsame = (value1, value2) => { return ((value1 !== null && value1 !== '' && value1 !== undefined ? value1 : null) !== (value2 !== null && value2 !== '' && value2 !== undefined ? value2 : null)); }
const series = (label, count, limit = 7) => { return `${label}${('0000000' + count).substr(('0000000' + count).length - limit)}`; }

const form = (oc = [], uoc = []) => {
    let cols = '';
    let vals = '';
    
    for(let count = 0; count < oc.length; count++) {
        if(Object.keys(uoc).some(key => key === oc[count])) {
            if(!(oc[count] === 'updated_by' && uoc[oc[count]] === ',  ') && 
                !(oc[count] === 'deleted_by' && uoc[oc[count]] === ',  ') && 
                !(oc[count] === 'imported_by' && uoc[oc[count]] === ',  ')) {
                    
                cols += `${count === 0 ? '' : ', '}${oc[count]}`;
                vals += `${count === 0 ? '' : ', '}${uoc[oc[count]] === '' || uoc[oc[count]] === undefined ? null : 
                                isNaN(uoc[oc[count]]) ? 
                                    oc[count] !== 'user_level' && oc[count] !== 'employment_status' && oc[count] !== 'civil_status' && oc[count] !== 'branch' && oc[count] !== 'status' && oc[count] !== 'username' && oc[count] !== 'gender' ?
                                        oc[count] !== 'password' ? `'${uoc[oc[count]].toUpperCase()}'` : `'${uoc[oc[count]]}'` : `'${uoc[oc[count]]}'`
                                : oc[count] === 'employee_no' || oc[count] === 'rfid' || oc[count] === 'serial_no' ? `'${(uoc[oc[count]]).toUpperCase()}'` : uoc[oc[count]]}`;
            }
        }
    }

    return { cols, vals }
}

const date = (date) => {
    let year = date.getFullYear();
    let month = `${ (date.getMonth() + 1) >= 10 ? '' : '0' }${ date.getMonth() + 1 }`;
    let day = `${date.getDate() >= 10 ? '' : '0'}${date.getDate() }`;
    let hr = `${ (date.getHours()) >= 10 ? '' : '0' }${ date.getHours() }`;
    let min = `${ (date.getMinutes()) >= 10 ? '' : '0' }${date.getMinutes() }`;
    let sec = `${ (date.getSeconds()) >= 10 ? '' : '0' }${date.getSeconds() }`;

    return `${year}-${month}-${day}T${hr}:${min}:${sec}`
}

const audit = async (data) => {
    let cols = '';
    let vals = '';

    for(let count = 0; count < (Object.entries(data)).length; count++) {
        let _keys = Object.entries(data)[count][0];
        let _vals = Object.entries(data)[count][1];

        cols += `${ count === 0 ? '' : ', ' }${ _keys }`;
        vals += `${ count === 0 ? '' : ', ' }${ _keys === 'item_id' || _keys === 'user_id' ? _vals : _vals !== null ? `'${_vals}'` : null}`;
    }
    
    await new Builder(`tbl_audit_trail`).insert(cols, vals).build();
}

const randomizer = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(let i = 0; i < length; i++) { result += characters.charAt(Math.floor(Math.random() * characters.length)); }
    return (result).toUpperCase();
}

const compare = (_old, _new) => {
    let __old = _old !== null && _old !== undefined && _old !== '' ? Number.isInteger(_old) ? _old : _old.toUpperCase() : null;
    let __new = _new !== null && _new !== undefined && _new !== '' ? Number.isInteger(_new) ? _new : _new.toUpperCase() : null;
    
    return __old !== __new;
}

module.exports = {
    form,
    series,
    date,
    checkifsame,
    randomizer,
    audit,
    compare,
    USER,
    PASS
}