import pointer from "json-pointer";
import rename from "rename-keys";

export default class Exception extends Error {
    fields:string;
    code: string;
    message: string;

    constructor(data:any) {
        super();
        if (!data.fields) throw new Error("FIELDS_REQUIRED");
        if (!data.code) throw new Error("MESSAGE_REQUIRED");

        const fields = pointer.dict(data.fields);

        this.fields = rename(fields, (str:string):string => str.substr(1));

        this.code = data.code;
        this.message = data.message;
    }

    public toHash() {
        return {
            fields: this.fields,
            code: this.code
        };
    }
}
