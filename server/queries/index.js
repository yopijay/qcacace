 // Tables
const Category = require('./tables/Category');
const Breed = require('./tables/Breed');
const Coat = require('./tables/Coat');
const LifeStages = require('./tables/LifeStages');
const Tags = require('./tables/Tags');
const Pets = require('./tables/Pets');
const Users = require('./tables/Users');
const Appointment = require('./tables/Appointment');
const Services = require('./tables/Services');
const FurrParent = require('./tables/FurrParent');
const Documents = require('./tables/Documents');
const Schedule = require('./tables/Schedule');
const Payment = require('./tables/Payment');
const Programs = require('./tables/Programs');
const Subscribers = require('./tables/Subscribers');
const MissingPets = require('./tables/MissingPets');
const AnimalCare = require('./tables/AnimalCare');

const login = async (data) => { return await new Users().login(data); }
const logout = async (data) => { return await new Users().logout(data); }
const profile = async (id) => { return await new Users().profile(id); }
const top = async (data) => { return await new Pets().top(data); }
const recommend = async (data) => { return await new Pets().recommend(data); }
const resend = async (data) => { return await new FurrParent().resend(data); }
const verifying = async (data) => { return await new FurrParent().verifying(data); }

const availabledates = async (data) => { return await new Appointment().availabeldates(data); }
const pay = async (data) => { return await new Payment().pay(data); }

const dashboard = (table) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_breed': resolve(await new Breed().dashboard()); break;
            case 'tbl_users': resolve(await new Users().dashboard()); break;
            case 'tbl_documents': resolve(await new Documents().dashboard()); break;
            case 'tbl_schedule': resolve(await new Schedule().dashboard()); break;
            case 'tbl_payments': resolve(await new Payment().dashboard()); break;
            case 'tbl_services': resolve(await new Services().dashboard()); break;
            case 'tbl_pets': resolve(await new Pets().dashboard()); break;
            case 'tbl_subscribers': resolve(await new Subscribers().dashboard()); break;
        }
    });
}

const evaluate = (table, type, data) => {
    return new Promise(async resolve => {
        switch(type) {
            case 'approve':
                switch(table) {
                    case 'tbl_documents': resolve(await new Documents().approve(data)); break;
                    case 'tbl_schedule': resolve(await new Schedule().approve(data)); break;
                    case 'tbl_payments': resolve(await new Payment().approve(data)); break;
                    case 'tbl_services': resolve(await new Services().approve(data)); break;
                }
            break;
            case 'reject':
                switch(table) {
                    case 'tbl_documents': resolve(await new Documents().reject(data)); break;
                    case 'tbl_schedule': resolve(await new Schedule().reject(data)); break;
                    case 'tbl_payments': resolve(await new Payment().reject(data)); break;
                    case 'tbl_services': resolve(await new Services().reject(data)); break;
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
            case 'tbl_services': resolve(await new Services().search(data)); break;
            case 'tbl_documents': resolve(await new Documents().search(data)); break;
            case 'tbl_schedule': resolve(await new Schedule().search(data)); break;
            case 'tbl_payments': resolve(await new Payment().search(data)); break;
            case 'tbl_programs': resolve(await new Programs().search(data)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().search(data)); break;
            case 'tbl_missing_pets': resolve(await new MissingPets().search(data)); break;
            case 'tbl_subscribers': resolve(await new Subscribers().search(data)); break;
        }
    });
}

const list = (table, data) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_category': resolve(await new Category().list()); break;
            case 'tbl_breed': resolve(await new Breed().list()); break;
            case 'tbl_life_stages': resolve(await new LifeStages().list()); break;
            case 'tbl_tags': resolve(await new Tags().list()); break;
            case 'tbl_coat': resolve(await new Coat().list()); break;
            case 'tbl_pets': resolve(await new Pets().list(data)); break;
            case 'tbl_appointments': resolve(await new Appointment().list()); break;
            case 'tbl_users': resolve(await new Users().list(data)); break;
            case 'tbl_services': resolve(await new Services().list()); break;
            case 'tbl_documents': resolve(await new Documents().list()); break;
            case 'tbl_schedule': resolve(await new Schedule().list()); break;
            case 'tbl_payments': resolve(await new Payment().list()); break;
            case 'tbl_programs': resolve(await new Programs().list(data)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().list(data)); break;
            case 'tbl_missing_pets': resolve(await new MissingPets().list()); break;
            case 'tbl_subscribers': resolve(await new Subscribers().list()); break;
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
            case 'tbl_services': resolve(await new Services().specific(id)); break;
            case 'tbl_furr_parent': resolve(await new FurrParent().specific(id)); break;
            case 'tbl_documents': resolve(await new Documents().specific(id)); break;
            case 'tbl_programs': resolve(await new Programs().specific(id)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().specific(id)); break;
            case 'tbl_missing_pets': resolve(await new MissingPets().specific(id)); break;
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
            case 'tbl_furr_parent': resolve(await new FurrParent().save(data)); break;
            case 'tbl_documents': resolve(await new Documents().save(data)); break;
            case 'tbl_schedule': resolve(await new Schedule().save(data)); break;
            case 'tbl_programs': resolve(await new Programs().save(data)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().save(data)); break;
            case 'tbl_subscribers': resolve(await new Subscribers().save(data)); break;
            case 'tbl_missing_pets': resolve(await new MissingPets().save(data)); break;
            case 'tbl_services': resolve(await new Services().save(data)); break;
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
            case 'tbl_furr_parent': resolve(await new FurrParent().update(data)); break;
            case 'tbl_programs': resolve(await new Programs().update(data)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().update(data)); break;
            case 'tbl_missing_pets': resolve(await new MissingPets().update(data)); break;
            case 'tbl_services': resolve(await new Services().update(data)); break;
        }
    });
}

const remove = (table, id) => {
    return new Promise(async resolve => {
        switch(table) {
            case 'tbl_programs': resolve(await new Programs().remove(id)); break;
            case 'tbl_animal_care': resolve(await new AnimalCare().remove(id)); break;
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
    remove,
    search,
    dropdown,
    top,
    recommend,
    resend,
    verifying,
    availabledates,
    evaluate,
    pay
}