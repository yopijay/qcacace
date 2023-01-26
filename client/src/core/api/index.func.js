// Core
import { api } from '../global/function/index.func'; // Function
import Env from '../constants/json/Env.json'; // Constants


let env = 'lan';
let _dropdown= [{ id: 0, name: '-- SELECT AN ITEM BELOW --' }];

export const records = async ({ table, data }) => { return await api({ url: `${Env[env].url}/list/${table}`, method: 'post', data: data }).then(res => res.data); }
export const look = async ({ table, data }) => { return await api({ url: `${Env[env].url}/search/${table}`, method: 'post', data: data }).then(res => res.data); }
export const specific = async ({ table, id }) => { return await api({ url: `${Env[env].url}/specific/${table}/${id}`, method: 'get' }).then(res => res.data); }
export const top = async ({ table, data }) => { return await api({ url: `${Env[env].url}/top/${table}`, method: 'post', data: data }).then(res => res.data); }
export const recommend = async (data) => { return await api({ url: `${Env[env].url}/recommend`, method: 'post', data: data }).then(res => res.data); }
export const dropdown = async ({ table, data}) => { return await api({ url: `${Env[env].url}/dropdown/${table}`, method: 'post', data: data }).then(res => _dropdown.concat(res.data)); }
export const registration = async (data) => { return await api({ url: `${Env[env].url}/register`, method: 'post', data: data }).then(res => res.data); }
export const verifying = async (data) => { return await api({ url: `${Env[env].url}/verifying`, method: 'post', data: data }).then(res => res.data); }