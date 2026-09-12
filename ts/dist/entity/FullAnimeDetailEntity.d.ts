import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { FullAnimeDetail, FullAnimeDetailLoadMatch } from '../AnipubTypes';
declare class FullAnimeDetailEntity extends AnipubEntityBase<FullAnimeDetail> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: FullAnimeDetailEntity): FullAnimeDetailEntity;
    load(this: any, reqmatch?: FullAnimeDetailLoadMatch, ctrl?: Control): Promise<FullAnimeDetailEntity>;
}
export { FullAnimeDetailEntity };
