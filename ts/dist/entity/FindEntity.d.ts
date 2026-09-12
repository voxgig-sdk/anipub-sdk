import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Find, FindLoadMatch } from '../AnipubTypes';
declare class FindEntity extends AnipubEntityBase<Find> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: FindEntity): FindEntity;
    load(this: any, reqmatch?: FindLoadMatch, ctrl?: Control): Promise<FindEntity>;
}
export { FindEntity };
