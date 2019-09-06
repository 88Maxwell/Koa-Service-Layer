export const isFunction = (func: any) => func && func instanceof Function;

export const deepClone = (obj: any): object | Array<any> => JSON.parse(JSON.stringify(obj));

type Dict = { [key: string]: any };

export const renameKeys = (obj: Dict, fn: Function): object => {
    const keys: Array<string> = Object.keys(obj);
    const result: Dict = {};

    keys.forEach((key: string): void => {
        const val: any = obj[key];
        const str: string = fn(key, val);

        if (str !== "") key = str;

        result[key] = val;
    });

    return result;
};
