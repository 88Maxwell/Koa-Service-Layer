export const isFunction = (func:any) => func && func instanceof Function;

export const deepClone = (obj:any) => JSON.parse(JSON.stringify(obj));
