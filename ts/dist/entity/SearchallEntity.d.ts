import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Searchall, SearchallLoadMatch } from '../AnipubTypes';
declare class SearchallEntity extends AnipubEntityBase<Searchall> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: SearchallEntity): SearchallEntity;
    load(this: any, reqmatch?: SearchallLoadMatch, ctrl?: Control): Promise<SearchallEntity>;
}
export { SearchallEntity };
