import pointer from "json-pointer";
import { renameKeys } from "./utils/helpers";

interface ErrorData {
    fields: object;
    code: string;
    message?: string;
}

interface ToHash {
    fields: object;
    code: string;
}

export default class Exception extends Error {
    fields: object;
    code: string;
    message: string;

    constructor({ fields, code, message }: ErrorData) {
        super();

        this.fields = renameKeys(pointer.dict(fields), (str: string): string => str.substr(1));
        this.code = code;
        this.message = message;
        this.toHash = this.toHash.bind(this)
    }

    public toHash(): ToHash {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}
