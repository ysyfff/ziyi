import {openDB} from 'idb';

export default async (cb)=>{
  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  var db = await openDB('ziyi', 1, cb ? cb : ()=>1);
  return db;
}