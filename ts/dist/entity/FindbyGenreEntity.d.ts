import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { FindbyGenre, FindbyGenreLoadMatch } from '../AnipubTypes';
declare class FindbyGenreEntity extends AnipubEntityBase<FindbyGenre> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: FindbyGenreEntity): FindbyGenreEntity;
    load(this: any, reqmatch?: FindbyGenreLoadMatch, ctrl?: Control): Promise<FindbyGenreEntity>;
}
export { FindbyGenreEntity };
