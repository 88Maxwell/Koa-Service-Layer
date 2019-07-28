export const isFunction = func => func && func instanceof Function;

export const deepClone = obj => JSON.parse(JSON.stringify(obj));
