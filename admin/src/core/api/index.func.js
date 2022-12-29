// Libraries
// import QRCode from 'qrcode';

// Core
import { api } from '../global/function/index.func'; // Function
import Env from '../constants/json/Env.json'; // Constants


let env = 'local';
// let _dropdown= [{ id: 0, name: '-- SELECT AN ITEM BELOW --' }];

export const authentication = async (data) => { return await api({ url: `${Env[env].url}/login`, method: 'post', data: data }).then(res => res.data); }
export const logout = async (data) => { return await api({ url: `${Env[env].url}/logout`, method: 'post', data: data }).then(res => res.data); }
export const profile = async (id) => { return await api({ url: `${Env[env].url}/profile/${id}`, method: 'get' }).then(res => res.data); }
export const dashboard = async (table) => { return await api({ url: `${Env[env].url}/dashboard/${table}`, method: 'get' }).then(res => res.data); }
export const records = async ({ table, data }) => { return await api({ url: `${Env[env].url}/list/${table}`, method: 'post', data: data }).then(res => res.data); }

// export const authentication = async (data) => { return await api(`${Env[env].url}/login`, 'post', data).then(res => res.data); }
// export const profile = async ({ table, query }) => { return await api(`${Env[env].url}/profile/${table}/${query}`, 'get').then(res => res.data); }
// export const get = async ({ table = '', type = '', query = '' }) => { return await api(`${Env[env].url}/${table}/${type}/${query}`, 'get').then(res =>{ if(type === 'dropdown' && Array.isArray(res.data)) { return _dropdown.concat(res.data); } return res.data }) }
// export const save = async ({ table, type, data }) => { return await api(`${Env[env].url}/${table}/${type}`, 'post', data).then(res => res.data); }
// export const update = async ({ table, type, query, data }) => { return await api(`${Env[env].url}/${table}/${type}/${query}`, 'post', data).then(res => res.data); }
// export const record = async ({ table = '', query = ''}) => { return await api(`${Env[env].url}/list/${table}/${query}`, 'get').then(res =>{ return res.data }); }
// export const dropdown = async({ table, data }) => { return await api(`${Env[env].url}/dropdown/${table}`, 'post', data).then(res => { return _dropdown.concat(res.data); }); }
// export const scan = async({ table, data }) => { return await api(`${Env[env].url}/scan/${table}/`, 'post', data).then(res => { console.log(res); return res.data }); }
// export const generateQR = async (identification, set) => { const qrcode = await QRCode.toDataURL(`${identification}`); set(qrcode); }
// export const excel = async ({ table = '', type = ''}) => { return await api(`${Env[env].url}/excel/${table}/${type}`, 'get').then(res =>{ return res.data }); }
// export const look = async ({ table, data }) => { return await api(`${Env[env].url}/search/${table}`, 'post', data).then(res => res.data); }
// export const upload = async ({ table, data }) => { return await api(`${Env[env].url}/upload/${table}`, 'post', data).then(res => res.data); }