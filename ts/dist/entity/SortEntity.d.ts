import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Sort, SortListMatch } from '../AnipubTypes';
declare class SortEntity extends AnipubEntityBase<Sort> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: SortEntity): SortEntity;
    list(this: any, reqmatch?: SortListMatch, ctrl?: Control): Promise<SortEntity[]>;
}
export { SortEntity };
