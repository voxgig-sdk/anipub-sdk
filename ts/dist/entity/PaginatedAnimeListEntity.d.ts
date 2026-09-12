import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { PaginatedAnimeList, PaginatedAnimeListLoadMatch, PaginatedAnimeListListMatch } from '../AnipubTypes';
declare class PaginatedAnimeListEntity extends AnipubEntityBase<PaginatedAnimeList> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: PaginatedAnimeListEntity): PaginatedAnimeListEntity;
    load(this: any, reqmatch?: PaginatedAnimeListLoadMatch, ctrl?: Control): Promise<PaginatedAnimeListEntity>;
    list(this: any, reqmatch?: PaginatedAnimeListListMatch, ctrl?: Control): Promise<PaginatedAnimeListEntity[]>;
}
export { PaginatedAnimeListEntity };
