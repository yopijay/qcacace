// Libraries
import QRCode from 'qrcode';

// Core
import { api } from '../global/function/index.func'; // Function
import Env from '../constants/json/Env.json'; // Constants


let env = 'prod';
let _dropdown= [{ id: 0, name: '-- SELECT AN ITEM BELOW --' }];

export const authentication = async ({ data, type }) => { return await api(`${Env[env].url}/authentication/${type}`, 'post', data).then(res => res.data); }
export const profile = async ({ table, query }) => { return await api(`${Env[env].url}/profile/${table}/${query}`, 'get').then(res => res.data); }
export const record = async ({ table = '', query = ''}) => { return await api(`${Env[env].url}/list/${table}/${query}`, 'get').then(res =>{ return res.data }); }
export const excel = async ({ table = '', type = ''}) => { return await api(`${Env[env].url}/excel/${table}/${type}`, 'get').then(res =>{ return res.data }); }
export const save = async ({ table, type, data }) => { return await api(`${Env[env].url}/${table}/${type}`, 'post', data).then(res => res.data); }
export const update = async ({ table, type, query, data }) => { return await api(`${Env[env].url}/${table}/${type}/${query}`, 'post', data).then(res => res.data); }
export const get = async ({ table = '', type = '', query = '' }) => { return await api(`${Env[env].url}/${table}/${type}/${query}`, 'get').then(res =>{ if(type === 'dropdown' && Array.isArray(res.data)) { return _dropdown.concat(res.data); } return res.data }) }
export const look = async ({ table, data }) => { return await api(`${Env[env].url}/search/${table}`, 'post', data).then(res => res.data); }
export const dropdown = async({ table, data }) => { return await api(`${Env[env].url}/dropdown/${table}`, 'post', data).then(res => { return _dropdown.concat(res.data); }); }
export const generateQR = async (table, condition, type, set) => { const qrcode = await QRCode.toDataURL(`${Env[env].url}/${table}/${type}/${condition}`); set(qrcode); }
export const upload = async ({ table, data }) => { return await api(`${Env[env].url}/upload/${table}`, 'post', data).then(res => res.data); }