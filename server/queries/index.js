// Libraries
const db = require('../connection');

// Tables
const Category = require('./tables/Category');
const Breed = require('./tables/Breed');
const Users = require('./tables/Users');
const Pets = require('./tables/Pets');
const Tags = require('./tables/Tags');

const login = async (data) => { return await new Users().login(data); }
const logout = async (data) => { return await new Users().logout(data); }
const profile = async (id) => { return await new Users().profile(id); }
const recommend = async (data) => { return await new Pets().recommend(data); }
const register = async (data) => { return await new Users().register(data); }
const verify = async (id) => { return await new Users().verify(id); }
const verifying = async (id) => { return await new Users().verifying(id); }

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
            case 'tbl_pet_category': resolve(await new Category().search(data)); break;
            case 'tbl_breed': resolve(await new Breed().search(data)); break;
            case 'tbl_pets': resolve(await new Pets().search(data)); break;
            case 'tbl_users': resolve(await new Users().search(data)); break;
            case 'tbl_pet_tags': resolve(await new Tags().search(data)); break;
        }
    })
}

const list = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().list()); break;
            case 'tbl_breed': resolve(await new Breed().list()); break;
            case 'tbl_pets': resolve(await new Pets().list()); break;
            case 'tbl_users': resolve(await new Users().list(data)); break;
            case 'tbl_pet_tags': resolve(await new Tags().list()); break;
        }
    });
}

const specific = (table, id) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().specific(id)); break;
            case 'tbl_breed': resolve(await new Breed().specific(id)); break;
            case 'tbl_pets': resolve(await new Pets().specific(id)); break;
            case 'tbl_users': resolve(await new Users().specific(id)); break;
            case 'tbl_pet_tags': resolve(await new Tags().specific(id)); break;
        }
    });
}

const save = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().save(data)); break;
            case 'tbl_breed': resolve(await new Breed().save(data)); break;
            case 'tbl_pets': resolve(await new Pets().save(data)); break;
            case 'tbl_users': resolve(await new Users().save(data)); break;
            case 'tbl_pet_tags': resolve(await new Tags().save(data)); break;
        }
    });
}

const update = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().update(data)); break;
            case 'tbl_breed': resolve(await new Breed().update(data)); break;
            case 'tbl_pets': resolve(await new Pets().update(data)); break;
            case 'tbl_users': resolve(await new Users().update(data)); break;
            case 'tbl_pet_tags': resolve(await new Tags().update(data)); break;
        }
    });
}

const dropdown = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_pet_category': resolve(await new Category().dropdown()); break;
            case 'tbl_breed': resolve(await new Breed().dropdown(data)); break;
            case 'tbl_pet_tags': resolve(await new Tags().dropdown()); break;
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
    top,
    recommend,
    register,
    verify,
    verifying
}