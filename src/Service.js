export default class Service {
    async runExecutor(args){
        const result = await this.execute(args);

        return result;
    }
}
