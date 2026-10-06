import {options,parseDate,dateKey} from '../utils/data.js';
const KEY='shitty-app:v1';
export function validateEntry(e){if(!e||typeof e.id!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(e.date)||dateKey(parseDate(e.date))!==e.date||!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time))return false;return Object.keys(options).every(k=>(!e[k]&&!['shape','color'].includes(k))||options[k].some(o=>o[0]===e[k]))&&typeof e.notes==='string';}
function load(){try{const data=JSON.parse(localStorage.getItem(KEY)||'{"version":1,"entries":[]}');if(data.version!==1||!Array.isArray(data.entries))throw Error();return {...data,entries:data.entries.filter(validateEntry)};}catch{return {version:1,entries:[],warning:'Saved data could not be read. Original storage is preserved until you save or delete data.'};}}
function write(data){try{localStorage.setItem(KEY,JSON.stringify(data));}catch{throw Error('Could not save on this device. Check your browser storage settings and try again.');}}
export const getEntries=()=>load().entries;
export const getStorageWarning=()=>load().warning;
export const getEntriesForDate=(date)=>getEntries().filter(e=>e.date===date);
export function createEntry(input){const now=new Date().toISOString(),entry={...input,id:crypto.randomUUID(),createdAt:now,updatedAt:now};if(!validateEntry(entry))throw Error('Choose a shape, color, and valid date and time.');const data=load();write({...data,warning:undefined,entries:[...data.entries,entry]});return entry;}
export function updateEntry(id,updates){const data=load(),old=data.entries.find(e=>e.id===id);if(!old)throw Error('This entry no longer exists.');const entry={...old,...updates,id,createdAt:old.createdAt,updatedAt:new Date().toISOString()};if(!validateEntry(entry))throw Error('Choose a shape, color, and valid date and time.');write({...data,entries:data.entries.map(e=>e.id===id?entry:e)});return entry;}
export function deleteEntry(id){const data=load();write({...data,entries:data.entries.filter(e=>e.id!==id)});}
export function deleteAllData(){write({version:1,entries:[]});}
export const getPreference=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(`shitty-pref:${key}`))??fallback}catch{return fallback}};
export const setPreference=(key,value)=>{try{localStorage.setItem(`shitty-pref:${key}`,JSON.stringify(value))}catch{}};
