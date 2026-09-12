import { Context } from './Context';
declare class AnipubError extends Error {
    isAnipubError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AnipubError };
