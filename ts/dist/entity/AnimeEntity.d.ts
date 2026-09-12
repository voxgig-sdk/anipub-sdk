import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Anime, AnimeLoadMatch, AnimeCreateData } from '../AnipubTypes';
declare class AnimeEntity extends AnipubEntityBase<Anime> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: AnimeEntity): AnimeEntity;
    load(this: any, reqmatch?: AnimeLoadMatch, ctrl?: Control): Promise<AnimeEntity>;
    create(this: any, reqdata?: AnimeCreateData, ctrl?: Control): Promise<AnimeEntity>;
}
export { AnimeEntity };
