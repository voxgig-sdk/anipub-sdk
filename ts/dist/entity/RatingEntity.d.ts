import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Rating, RatingListMatch } from '../AnipubTypes';
declare class RatingEntity extends AnipubEntityBase<Rating> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: RatingEntity): RatingEntity;
    list(this: any, reqmatch?: RatingListMatch, ctrl?: Control): Promise<RatingEntity[]>;
}
export { RatingEntity };
