// Libraries
const db = require('../connection');

// Crud
const Authentication = require('./crud/Authentication');
const Users = require('./crud/Users');

const authentication = (data, type) => { return new Authentication(data)[type](); }

 const profile = (table, query) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_users': resolve(await new Users(query)['profile']()); break;
        }
    });
 }

module.exports = {
    authentication,
    profile
}