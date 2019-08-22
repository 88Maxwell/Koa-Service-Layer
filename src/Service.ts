export default class Service {
    execute: Function;
    runExecutor = (args:any):any => this.execute(args);
}
