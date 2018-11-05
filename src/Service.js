// import Exception from './Exception';

export default class Service {
    constructor(args) {
        if (!args.context) throw new Error('CONTEXT_REQUIRED');
        this.context = args.context;
    }

    execute = async args => {
        const result = await this.body(args);

        return result;
    }
}
