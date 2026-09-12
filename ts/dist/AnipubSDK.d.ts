import { AnimeEntity } from './entity/AnimeEntity';
import { FindEntity } from './entity/FindEntity';
import { FullAnimeDetailEntity } from './entity/FullAnimeDetailEntity';
import { InfoEntity } from './entity/InfoEntity';
import { PaginatedAnimeListEntity } from './entity/PaginatedAnimeListEntity';
import { RatingEntity } from './entity/RatingEntity';
import { SearchEntity } from './entity/SearchEntity';
import { StreamingDetailEntity } from './entity/StreamingDetailEntity';
export type * from './AnipubTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AnipubEntityBase } from './AnipubEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AnipubSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Anime(entopts?: Record<string, any>): AnimeEntity;
    Find(entopts?: Record<string, any>): FindEntity;
    FullAnimeDetail(entopts?: Record<string, any>): FullAnimeDetailEntity;
    Info(entopts?: Record<string, any>): InfoEntity;
    PaginatedAnimeList(entopts?: Record<string, any>): PaginatedAnimeListEntity;
    Rating(entopts?: Record<string, any>): RatingEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    StreamingDetail(entopts?: Record<string, any>): StreamingDetailEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AnipubSDK;
    tester(testopts?: any, sdkopts?: any): AnipubSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AnipubSDK;
export { stdutil, config, BaseFeature, AnipubEntityBase, AnipubSDK, SDK, };
