// Type definitions for Service
// Project: Service-Layer
// Definitions by: maxwell88soltyk https://88maxwell.github.io/My-personal-page/


declare class Service {
    execute: Function;
    runExecutor(args: object): any;
}

export = Service;