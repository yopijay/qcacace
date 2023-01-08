// Libraries
const db = require('../connection');

// Tables
const Category = require('./tables/Category');
const Breed = require('./tables/Breed');
const Users = require('./tables/Users');

const login = (data) => { return new Users().login(data); }
const logout = (data) => { return new Users().logout(data); }
const profile = (id) => { return new Users().profile(id); }

const dashboard = (table) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_breed': resolve(await new Breed().dashboard()); break;
            case 'tbl_users': resolve(await new Users().dashboard()); break;
        }
    });
}

const search = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().search(data)); break;
            case 'tbl_breed': resolve(await new Breed().search(data)); break;
            case 'tbl_users': resolve(await new Users().search(data)); break;
        }
    })
}

const list = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().list()); break;
            case 'tbl_breed': resolve(await new Breed().list()); break;
            case 'tbl_users': resolve(await new Users().list(data));  break;
        }
    });
}

const specific = (table, id) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().specific(id)); break;
            case 'tbl_breed': resolve(await new Breed().specific(id)); break;
            case 'tbl_users': resolve(await new Users().specific(id)); break;
        }
    });
}

const save = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().save(data)); break;
            case 'tbl_breed': resolve(await new Breed().save(data)); break;
            case 'tbl_users': resolve(await new Users().save(data)); break;
        }
    });
}

const update = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().update(data)); break;
            case 'tbl_breed': resolve(await new Breed().update(data)); break;
            case 'tbl_users': resolve(await new Users().update(data)); break;
        }
    });
}

const dropdown = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().dropdown()); break;
        }
    })
}
// const Authentication = require('./crud/Authentication');
// const Users = require('./crud/Users');
// const Category = require('./crud/Category');
// const Breed = require('./crud/Breed');
// const Pets = require('./crud/Pets');
// const Adopt = require('./crud/Adopt');
// const AdoptDocuments = require('./crud/AdoptDocuments');

// const authentication = async (data, type) => { return await new Authentication(data)[type](); }

// const profile = (table, query) => {
//     return new Promise(async resolve => {
//         switch(table) {
//             case 'tbl_users': resolve(await new Users(query)['profile']()); break;
//         }
//     });
// }

// const list = (table, query) => {
//     return new Promise(async resolve => {
//         switch(table) {
//             case 'tbl_users': resolve(await new Users(query)['list']()); break;
//             case 'tbl_pet_category': resolve(await new Category(query)['list']()); break;
//             case 'tbl_breed': resolve(await new Breed(query)['list']()); break;
//             case 'tbl_pets': resolve(await new Pets(query)['list']()); break;
//             case 'tbl_adopt': resolve(await new Adopt(query)['list']()); break;
//         }
//     });
// }

// const get = (table, type, query) => {
//     return new Promise(async (resolve) => {
//         switch(table) {
//             case 'tbl_users': resolve(await new Users(query)[type]()); break;
//             case 'tbl_pet_category': resolve(await new Category(query)[type]()); break;
//             case 'tbl_breed': resolve(await new Breed(query)[type]()); break;
//             case 'tbl_pets': resolve(await new Pets(query)[type]()); break;
//             case 'tbl_adopt': resolve(await new Adopt(query)[type]()); break;
//             case 'tbl_adopt_documents': resolve(await new AdoptDocuments(query)[type]()); break;
//         }
//     });
// }

// const save = (table, type, data) => {
//     return new Promise(async resolve => {
//         switch(table) {
//             case 'tbl_users': resolve(await new Users('', data)[type]()); break
//             case 'tbl_pet_category': resolve(await new Category('', data)[type]()); break;
//             case 'tbl_breed': resolve(await new Breed('', data)[type]()); break;
//             case 'tbl_pets': resolve(await new Pets('', data)[type]()); break;
//             case 'tbl_adopt': resolve(await new Adopt('', data)[type]()); break;
//         }
//     });
// }

// const update = (table, type, query, data) => {
//     return new Promise(async resolve => {
//         switch(table) {
//             case 'tbl_users': resolve(await new Users(query, data)[type]()); break;
//             case 'tbl_pet_category': resolve(await new Category(query, data)[type]()); break;
//             case 'tbl_breed': resolve(await new Breed(query, data)[type]()); break;
//             case 'tbl_pets': resolve(await new Pets(query, data)[type]()); break;
//             case 'tbl_adopt': resolve(await new Adopt(query, data)[type]()); break;
//         }
//     });
// }

// const dropdown = (table, data) => {
//     return new Promise(resolve => {
//         switch(table) {
//             case 'tbl_breed': resolve(new Breed('', data)['dropdown_by']()); break;
//             case 'tbl_pets': resolve(new Pets('', data)['dropdown_by']()); break;
//         }
//     });
// }

// const scan = (table, data) => {
//     return new Promise(resolve => {
//         switch(table) {
//             case 'tbl_pets': resolve(new Pets('', data)['scan']()); break;
//         }
//     });
// }

module.exports = {
    login,
    logout,
    profile,
    dashboard,
    list,
    specific,
    save,
    update,
    search,
    dropdown
}