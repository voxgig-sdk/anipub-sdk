"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANIPUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnipubSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "Aired": { "a": true, "h": "Aired", "n": "Aired", "r": false, "sh": "Air date range", "t": "`$STRING`", "key$": "Aired", "index$": 0 }, "Cover": { "a": true, "h": "Cover", "n": "Cover", "r": false, "sh": "Cover image path or URL.", "t": "`$STRING`", "key$": "Cover", "index$": 1 }, "DescripTion": { "a": true, "h": "Descrip Tion", "n": "DescripTion", "r": false, "sh": "Anime description", "t": "`$STRING`", "key$": "DescripTion", "index$": 2 }, "Duration": { "a": true, "h": "Duration", "n": "Duration", "r": false, "sh": "Episode duration", "t": "`$STRING`", "key$": "Duration", "index$": 3 }, "Genres": { "a": true, "h": "Genres", "n": "Genres", "r": false, "sh": "List of genres", "t": "`$ARRAY`", "key$": "Genres", "index$": 4 }, "ImagePath": { "a": true, "h": "Image Path", "n": "ImagePath", "r": false, "sh": "Image path or URL.", "t": "`$STRING`", "key$": "ImagePath", "index$": 5 }, "MALScore": { "a": true, "h": "Mal Score", "n": "MALScore", "r": false, "sh": "MyAnimeList score", "t": "`$STRING`", "key$": "MALScore", "index$": 6 }, "Name": { "a": true, "h": "Name", "n": "Name", "r": false, "sh": "Anime name", "t": "`$STRING`", "key$": "Name", "index$": 7 }, "Premiered": { "a": true, "h": "Premiered", "n": "Premiered", "r": false, "sh": "Premiere season", "t": "`$STRING`", "key$": "Premiered", "index$": 8 }, "RatingsNum": { "a": true, "h": "Ratings Num", "n": "RatingsNum", "r": false, "sh": "Number of ratings", "t": "`$INTEGER`", "key$": "RatingsNum", "index$": 9 }, "Status": { "a": true, "h": "Status", "n": "Status", "r": false, "sh": "Airing status", "t": "`$STRING`", "key$": "Status", "index$": 10 }, "Studios": { "a": true, "h": "Studios", "n": "Studios", "r": false, "sh": "Production studio", "t": "`$STRING`", "key$": "Studios", "index$": 11 }, "Synonyms": { "a": true, "h": "Synonyms", "n": "Synonyms", "r": false, "sh": "Alternative names", "t": "`$STRING`", "key$": "Synonyms", "index$": 12 }, "epCount": { "a": true, "h": "Ep Count", "n": "epCount", "r": false, "sh": "Episode count", "t": "`$INTEGER`", "key$": "epCount", "index$": 13 }, "finder": { "a": true, "h": "Finder", "n": "finder", "r": false, "sh": "Slug identifier", "t": "`$STRING`", "key$": "finder", "index$": 14 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Anime ID", "t": "`$INTEGER`", "key$": "id", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "search", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/search/{name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/search/{name}", "q": { "exist": ["id"] }, "r": { "param": { "name": "id" } }, "s": [{ "lit": "api" }, { "lit": "search" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 6 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "search_ref01", "srcdatavar": "search_ref01_data", "suffix": "_dt0" }, "m": { "id": "search01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-search_ref01" } }], "index$": 0 }] }, 'Search', { "GET /api/search/{name}": { "protocol": "http", "operationId": "quickSearch", "responses": { "200": { "description": "Array of matching anime", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "_id": { "description": "Anime ID", "type": "integer", "key$": "_id" }, "Name": { "description": "Anime name", "type": "string", "key$": "Name" }, "ImagePath": { "description": "Image path or URL. Prepend https://anipub.xyz/ if relative", "type": "string", "key$": "ImagePath" }, "Cover": { "description": "Cover image path or URL. Prepend https://anipub.xyz/ if relative", "type": "string", "key$": "Cover" }, "Synonyms": { "description": "Alternative names", "type": "string", "key$": "Synonyms" }, "Aired": { "description": "Air date range", "type": "string", "key$": "Aired" }, "Premiered": { "description": "Premiere season", "type": "string", "key$": "Premiered" }, "RatingsNum": { "description": "Number of ratings", "type": "integer", "key$": "RatingsNum" }, "Genres": { "description": "List of genres", "items": { "type": "string" }, "type": "array", "key$": "Genres" }, "Studios": { "description": "Production studio", "type": "string", "key$": "Studios" }, "DescripTion": { "description": "Anime description", "type": "string", "key$": "DescripTion" }, "Duration": { "description": "Episode duration", "type": "string", "key$": "Duration" }, "MALScore": { "description": "MyAnimeList score", "type": "string", "key$": "MALScore" }, "Status": { "description": "Airing status", "type": "string", "key$": "Status" }, "epCount": { "description": "Episode count", "type": "integer", "key$": "epCount" }, "finder": { "description": "Slug identifier", "type": "string", "key$": "finder" } }, "x-ref": "#/components/schemas/AnimeInfo", "key$": "items" } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "name", "in": "path", "required": true, "description": "Search query — URL-encode spaces as %20", "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LOAD
        const search_ref01_ent = client.Search();
        const search_ref01_match_dt0 = {};
        search_ref01_match_dt0.id = search_ref01_data.id;
        const search_ref01_data_dt0 = (await search_ref01_ent.load(search_ref01_match_dt0)).data();
        (0, node_assert_1.default)(search_ref01_data_dt0.id === search_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnipubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANIPUB_TEST_SEARCH_ENTID': idmap,
        'ANIPUB_TEST_LIVE': 'FALSE',
        'ANIPUB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANIPUB_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.ANIPUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANIPUB_TEST_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AnipubSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ANIPUB_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SearchEntity.test.js.map