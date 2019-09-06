import pointer from "json-pointer";
import { renameKeys } from "./utils/helpers";

interface IErrorData {
    fields: object;
    code: string;
    message?: string;
}

interface IToHash {
    fields: object;
    code: string;
}

export default class Exception extends Error {
    fields: object;
    code: string;
    message: string;

    constructor({ fields, code, message }: IErrorData) {
        super();

        this.fields = renameKeys(pointer.dict(fields), (str: string): string => str.substr(1));
        this.code = code;
        this.message = message;
        this.toHash = this.toHash.bind(this)
    }

    public toHash(): IToHash {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}
