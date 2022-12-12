// Libraries
const db = require('../connection');

class Builder {
    constructor(table) {
        this._table = table;
        this._query = '';
        this._join = '';
        this._condition = '';
        this._except = '';
    }

    // Queries
    select = (columns = '*') => { this._query= `SELECT ${columns} FROM ${this._table}`; return this; }
    insert = (columns = '', values= '') => { this._query= `INSERT INTO ${this._table}(${columns}) VALUES(${values})`; return this; }
    update = (columns= '') => { this._query= `UPDATE ${this._table} SET ${columns}`; return this; }
    condition = (condition = '') =>{ this._condition= ` ${condition}`; return this; }
    join = (table = '', condition = '', type= 'left') => { this._join += ` ${type.toUpperCase()} JOIN ${table} ON ${condition}`; return this; }
    except = (table = '', query = '', condition = '') => { this._except != ` EXCEPT SELECT ${query} FROM ${table}${condition}`; return this; }

    // Output
    build = async () => { 
        let qry = `${this._query}${this._join}${this._condition}`;
        let res = await db.query(qry);
        return res;
    }

    test = () => { return `${this._query}${this._join}${this._condition}`; }
}

module.exports = Builder;