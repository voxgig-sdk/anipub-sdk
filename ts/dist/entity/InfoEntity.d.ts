import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { Info, InfoLoadMatch } from '../AnipubTypes';
declare class InfoEntity extends AnipubEntityBase<Info> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: InfoEntity): InfoEntity;
    load(this: any, reqmatch?: InfoLoadMatch, ctrl?: Control): Promise<InfoEntity>;
}
export { InfoEntity };
