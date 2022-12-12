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
                                    oc[count] !== 'user_level' && oc[count] !== 'employment_status' && oc[count] !== 'civil_status' && oc[count] !== 'branch' && oc[count] !== 'status' && oc[count] !== 'username' ?
                                        oc[count] !== 'password' ? `'${uoc[oc[count]].toUpperCase()}'` : `'${btoa(uoc[oc[count]])}'` : `'${uoc[oc[count]]}'`
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

module.exports = {
    form,
    series,
    date,
    checkifsame
}