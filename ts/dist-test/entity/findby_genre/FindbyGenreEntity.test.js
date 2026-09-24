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
(0, node_test_1.describe)('FindbyGenreEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANIPUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnipubSDK.test();
        const ent = testsdk.FindbyGenre();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'findby_genre.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "currentPage": { "a": true, "h": "Current Page", "n": "currentPage", "r": false, "sh": "Current page number", "t": "`$INTEGER`", "key$": "currentPage", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "wholePage": { "a": true, "h": "Whole Page", "n": "wholePage", "r": false, "sh": "Array of anime on current page", "t": "`$ARRAY`", "key$": "wholePage", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "findby_genre", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/findbyGenre/{genre}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "harem", "k": "param", "n": "id", "or": "genre", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/findbyGenre/{genre}", "q": { "exist": ["id", "page"] }, "r": { "param": { "genre": "id" } }, "s": [{ "lit": "api" }, { "lit": "findbyGenre" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "findby_genre", "name__orig": "findby_genre", "Name": "FindbyGenre", "name_": "findby_genre", "name-": "findby-genre", "NAME": "FINDBY_GENRE", "index$": 2 }, { "active": true, "entity": "findby_genre", "key$": "BasicFindbyGenreFlow", "kind": "basic", "name": "BasicFindbyGenreFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "findby_genre_ref01", "srcdatavar": "findby_genre_ref01_data", "suffix": "_dt0" }, "m": { "id": "findby_genre01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-findby_genre_ref01" } }], "index$": 0 }] }, 'FindbyGenre', { "GET /api/findbyGenre/{genre}": { "protocol": "http", "operationId": "findByGenre", "responses": { "200": { "description": "Paginated list of anime by genre", "content": { "application/json": { "schema": { "type": "object", "properties": { "currentPage": { "description": "Current page number", "key$": "currentPage", "type": "integer" }, "wholePage": { "description": "Array of anime on current page", "items": { "properties": { "Aired": { "description": "Air date range", "type": "string", "key$": "Aired" }, "Cover": { "description": "Cover image path or URL. Prepend https://anipub.xyz/ if relative", "type": "string", "key$": "Cover" }, "DescripTion": { "description": "Anime description", "type": "string", "key$": "DescripTion" }, "Duration": { "description": "Episode duration", "type": "string", "key$": "Duration" }, "Genres": { "description": "List of genres", "items": { "type": "string" }, "type": "array", "key$": "Genres" }, "ImagePath": { "description": "Image path or URL. Prepend https://anipub.xyz/ if relative", "type": "string", "key$": "ImagePath" }, "MALScore": { "description": "MyAnimeList score", "type": "string", "key$": "MALScore" }, "Name": { "description": "Anime name", "type": "string", "key$": "Name" }, "Premiered": { "description": "Premiere season", "type": "string", "key$": "Premiered" }, "RatingsNum": { "description": "Number of ratings", "type": "integer", "key$": "RatingsNum" }, "Status": { "description": "Airing status", "type": "string", "key$": "Status" }, "Studios": { "description": "Production studio", "type": "string", "key$": "Studios" }, "Synonyms": { "description": "Alternative names", "type": "string", "key$": "Synonyms" }, "_id": { "description": "Anime ID", "type": "integer", "key$": "_id" }, "epCount": { "description": "Episode count", "type": "integer", "key$": "epCount" }, "finder": { "description": "Slug identifier", "type": "string", "key$": "finder" } }, "type": "object", "x-ref": "#/components/schemas/AnimeInfo", "index$": 0 }, "key$": "wholePage", "type": "array" } }, "x-ref": "#/components/schemas/PaginatedAnimeList", "index$": 0 } } } }, "400": { "description": "Invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "status": { "type": "integer", "description": "HTTP status code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "genre", "in": "path", "required": true, "description": "Genre name (e.g., harem, action, romance)", "schema": { "type": "string" }, "example": "harem", "index$": 0 }, { "name": "Page", "in": "query", "required": false, "description": "Page number, default 1", "schema": { "type": "integer", "default": 1 }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let findby_genre_ref01_data = Object.values(setup.data.existing.findby_genre)[0];
        // LOAD
        const findby_genre_ref01_ent = client.FindbyGenre();
        const findby_genre_ref01_match_dt0 = {};
        findby_genre_ref01_match_dt0.id = findby_genre_ref01_data.id;
        const findby_genre_ref01_data_dt0 = (await findby_genre_ref01_ent.load(findby_genre_ref01_match_dt0)).data();
        (0, node_assert_1.default)(findby_genre_ref01_data_dt0.id === findby_genre_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/findby_genre/FindbyGenreTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnipubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['findby_genre01', 'findby_genre02', 'findby_genre03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANIPUB_TEST_FINDBY_GENRE_ENTID': idmap,
        'ANIPUB_TEST_LIVE': 'FALSE',
        'ANIPUB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANIPUB_TEST_FINDBY_GENRE_ENTID'];
    const live = 'TRUE' === env.ANIPUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANIPUB_TEST_FINDBY_GENRE_ENTID'];
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
//# sourceMappingURL=FindbyGenreEntity.test.js.map