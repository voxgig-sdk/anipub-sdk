import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Search, SearchLoadMatch } from '../AnipubTypes';
declare class SearchEntity extends AnipubEntityBase<Search> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    load(this: any, reqmatch?: SearchLoadMatch, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };
