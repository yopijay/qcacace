export const months = () => ([
    { id: 1, name: 'JAN' },
    { id: 2, name: 'FEB' },
    { id: 3, name: 'MAR' },
    { id: 4, name: 'APR' },
    { id: 5, name: 'MAY' },
    { id: 6, name: 'JUN' },
    { id: 7, name: 'JUL' },
    { id: 8, name: 'AUG' },
    { id: 9, name: 'SEP' },
    { id: 10, name: 'OCT' },
    { id: 11, name: 'NOV' },
    { id: 12, name: 'DEC' }
]);

export const days = (month = 1, year= new Date().getFullYear()) => {
    let _days = [];
    let _dayPerMonth = month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12 ? 
                                        31 : month === 4 || month === 6 || month === 9 || month === 11 ? 
                                                30 : ((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400) ? 29 : 28;

    for(let _day = 1; _day <= _dayPerMonth; _day++) {
        _days.push({ id: _day, name: _day.toString() });
    }

    return _days;
}

export const years = () => {
    let _year = [];
    let _curYear = new Date().getFullYear();

    for(let year = _curYear - 122; year <=  _curYear; year++) {
        _year.push({ id: year, name: year.toString() });
    }
    
    return _year.sort().reverse();
}