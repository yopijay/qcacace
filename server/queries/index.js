// Tables
const Category = require('./tables/Category');
const Breed = require('./tables/Breed');
const Coat = require('./tables/Coat');
const LifeStages = require('./tables/LifeStages');
const Tags = require('./tables/Tags');
const Pets = require('./tables/Pets');
const Users = require('./tables/Users');
const Appointment = require('./tables/Appointment');
const Adopt = require('./tables/Adopt');
const Adopter = require('./tables/Adopter');
const AdopterDocuments = require('./tables/AdopterDocuments');
const AdopterSchedule = require('./tables/AdopterSchedule');
const AdopterPayment = require('./tables/AdopterPayment');

const login = async (data) => { return await new Users().login(data); }
const logout = async (data) => { return await new Users().logout(data); }
const profile = async (id) => { return await new Users().profile(id); }
const top = async (data) => { return await new Pets().top(data); }
const recommend = async (data) => { return await new Pets().recommend(data); }
const resend = async (data) => { return await new Adopter().resend(data); }
const verifying = async (data) => { return await new Adopter().verifying(data); }

const availabledates = async (data) => { return await new Appointment().availabeldates(data); }
const pay = async (data) => { return await new AdopterPayment().pay(data); }
// const verify = async (id) => { return await new Adopt().verify(id); }

const dashboard = (table) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_breed': resolve(await new Breed().dashboard()); break;
            case 'tbl_users': resolve(await new Users().dashboard()); break;
        }
    });
}

const evaluate = (table, type, data) => {
    return new Promise(async resolve => {
        switch(type) {
            case 'approve':
                switch(table) {
                    case 'tbl_adopter_documents': resolve(await new AdopterDocuments().approve(data)); break;
                    case 'tbl_adopter_schedule': resolve(await new AdopterSchedule().approve(data)); break;
                }
            break;
            case 'reject':
                switch(table) {
                    case 'tbl_adopter_documents': resolve(await new AdopterDocuments().reject(data)); break;
                    case 'tbl_adopter_schedule': resolve(await new AdopterSchedule().reject(data)); break;
                }
            break;
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
            case 'tbl_adopt': resolve(await new Adopt().list()); break;
            case 'tbl_adopter_documents': resolve(await new AdopterDocuments().list()); break;
            case 'tbl_adopter_schedule': resolve(await new AdopterSchedule().list()); break;
            case 'tbl_adopter_payment': resolve(await new AdopterPayment().list()); break;
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
            case 'tbl_adopt': resolve(await new Adopt().specific(id)); break;
            case 'tbl_adopter': resolve(await new Adopter().specific(id)); break;
            case 'tbl_adopter_documents': resolve(await new AdopterDocuments().specific(id)); break;
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
            case 'tbl_adopter': resolve(await new Adopter().save(data)); break;
            case 'tbl_adopter_documents': resolve(await new AdopterDocuments().save(data)); break;
            case 'tbl_adopter_schedule': resolve(await new AdopterSchedule().save(data)); break;
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
            case 'tbl_adopter': resolve(await new Adopter().update(data)); break;
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
    top,
    recommend,
    resend,
    verifying,
    availabledates,
    evaluate,
    pay
    // verify,
}