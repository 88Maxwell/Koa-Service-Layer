// Type definitions for Service-Layer
// Project: Service-Layer
// Definitions by: maxwell88soltyk https://88maxwell.github.io/My-personal-page/


declare namespace Exception {
    export interface Error {
        width?: number;
        height?: number;
    }
}

declare class Exception {
    private fields:string;
    private code: string;
    private message: string;
    constructor(someParam?: string);

    someProperty: string[];

    toHash(): Exception.Error;
}

export = Exception;
