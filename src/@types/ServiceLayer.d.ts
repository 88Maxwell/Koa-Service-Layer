// Type definitions for Service-Layer
// Project: Service-Layer
// Definitions by: maxwell88soltyk https://88maxwell.github.io/My-personal-page/

declare namespace ServiceLayer {
    export enum Type {
        required,
        custom,
        hidden
    }

    export interface Rule {
        name: string;
        type: Type;
        execute: Function;
    }

    export interface RulesObject {
        before: Array<Rule>;
        after: Array<Rule>;
    }

    export interface ExecuteRuleAruments {
        rules: Array<Rule>;
        ServiceClass: import("./Service");
        ctx: object;
        serviceData: object;
    }

    export interface Exeption {
        status: number;
        fields: object;
    }
}

declare module ServiceLayer {
    class ServiceLayer {
        private resolver: Function;
        private argumentBuilder: Function;
        private beforeRules: Array<ServiceLayer.Rule>;
        private afterRules: Array<ServiceLayer.Rule>;
    
        constructor(resolver: Function, argumentBuilder: Function, rules: ServiceLayer.RulesObject);
    
        public useService(ServiceClass: import("./Service")): any;
    
        private executeRules(args: ServiceLayer.ExecuteRuleAruments): any;
        private executeRule(rule: ServiceLayer.Rule, executeArgs: any): any;
        private errorCatchHandler(error): ServiceLayer.Exeption;
    }
    
}

export = ServiceLayer;
