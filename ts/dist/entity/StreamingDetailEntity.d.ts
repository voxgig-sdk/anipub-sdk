import { AnipubEntityBase } from '../AnipubEntityBase';
import type { AnipubSDK } from '../AnipubSDK';
import type { Control } from '../types';
import type { StreamingDetail, StreamingDetailLoadMatch } from '../AnipubTypes';
declare class StreamingDetailEntity extends AnipubEntityBase<StreamingDetail> {
    constructor(client: AnipubSDK, entopts: any);
    make(this: StreamingDetailEntity): StreamingDetailEntity;
    load(this: any, reqmatch?: StreamingDetailLoadMatch, ctrl?: Control): Promise<StreamingDetailEntity>;
}
export { StreamingDetailEntity };
