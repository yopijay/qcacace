// Tables
const Category = require('./tables/Category');
const Breed = require('./tables/Breed');
const Coat = require('./tables/Coat');
const LifeStages = require('./tables/LifeStages');
const Tags = require('./tables/Tags');
const Pets = require('./tables/Pets');
const Users = require('./tables/Users');
const Appointment = require('./tables/Appointment');
// const Adopt = require('./tables/Adopt');

const login = async (data) => { return await new Users().login(data); }
const logout = async (data) => { return await new Users().logout(data); }
const profile = async (id) => { return await new Users().profile(id); }
// const recommend = async (data) => { return await new Pets().recommend(data); }
// const register = async (data) => { return await new Adopt().register(data); }
// const verify = async (id) => { return await new Adopt().verify(id); }
// const verifying = async (data) => { return await new Adopt().verifying(data); }
// const payment = async (data) => { return await new Adopt().payment(data); }

const dashboard = (table) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_breed': resolve(await new Breed().dashboard()); break;
            case 'tbl_users': resolve(await new Users().dashboard()); break;
        }
    });
}

const top = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pets': resolve(await new Pets().top(data)); break;
        }
    });
}

const search = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().search(data)); break;
            case 'tbl_breed': resolve(await new Breed().search(data)); break;
            case 'tbl_coat': resolve(await new Coat().search(data)); break;
            case 'tbl_life_stages': resolve(await new LifeStages().search(data)); break;
            case 'tbl_tags': resolve(await new Tags().search(data)); break;
            case 'tbl_pets': resolve(await new Pets().search(data)); break;
            case 'tbl_users': resolve(await new Users().search(data)); break;
        }
    })
}

const list = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().list()); break;
            case 'tbl_breed': resolve(await new Breed().list()); break;
            case 'tbl_life_stages': resolve(await new LifeStages().list()); break;
            case 'tbl_tags': resolve(await new Tags().list()); break;
            case 'tbl_coat': resolve(await new Coat().list()); break;
            case 'tbl_pets': resolve(await new Pets().list()); break;
            case 'tbl_appointments': resolve(await new Appointment().list()); break;
            case 'tbl_users': resolve(await new Users().list(data)); break;
        }
    });
}

const specific = (table, id) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().specific(id)); break;
            case 'tbl_breed': resolve(await new Breed().specific(id)); break;
            case 'tbl_life_stages': resolve(await new LifeStages().specific(id)); break;
            case 'tbl_coat': resolve(await new Coat().specific(id)); break;
            case 'tbl_tags': resolve(await new Tags().specific(id)); break;
            case 'tbl_pets': resolve(await new Pets().specific(id)); break;
            case 'tbl_appointments': resolve(await new Appointment().specific(id)); break;
            case 'tbl_users': resolve(await new Users().specific(id)); break;
            // case 'tbl_adopt_info': resolve(await new Adopt().specific(id)); break;
        }
    });
}

const save = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().save(data)); break;
            case 'tbl_breed': resolve(await new Breed().save(data)); break;
            case 'tbl_life_stages': resolve(await new LifeStages().save(data)); break;
            case 'tbl_coat': resolve(await new Coat().save(data)); break;
            case 'tbl_tags': resolve(await new Tags().save(data)); break;
            case 'tbl_pets': resolve(await new Pets().save(data)); break;
            case 'tbl_appointments': resolve(await new Appointment().save(data)); break;
            case 'tbl_users': resolve(await new Users().save(data)); break;
            // case 'tbl_adopt_documents': resolve(await new Adopt().save(data)); break;
        }
    });
}

const update = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().update(data)); break;
            case 'tbl_breed': resolve(await new Breed().update(data)); break;
            case 'tbl_life_stages': resolve(await new LifeStages().update(data)); break;
            case 'tbl_coat': resolve(await new Coat().update(data)); break;
            case 'tbl_tags': resolve(await new Tags().update(data)); break;
            case 'tbl_pets': resolve(await new Pets().update(data)); break;
            case 'tbl_appointments': resolve(await new Appointment().update(data)); break;
            case 'tbl_users': resolve(await new Users().update(data)); break;
            // case 'tbl_adopt_info': resolve(await new Adopt().update(data)); break;
            // case 'tbl_adopt': resolve(await new Adopt().schedule(data)); break;
        }
    });
}

const dropdown = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().dropdown()); break;
            case 'tbl_breed': resolve(await new Breed().dropdown(data)); break;
            case 'tbl_coat': resolve(await new Coat().dropdown(data)); break;
            case 'tbl_life_stages': resolve(await new LifeStages().dropdown(data)); break;
            case 'tbl_tags': resolve(await new Tags().dropdown()); break;
        }
    })
}

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
    dropdown,
    // top,
    // recommend,
    // register,
    // verify,
    // verifying,
    // payment
}