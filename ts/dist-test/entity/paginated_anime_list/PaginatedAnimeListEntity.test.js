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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PaginatedAnimeListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANIPUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnipubSDK.test();
        const ent = testsdk.PaginatedAnimeList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'paginated_anime_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "Aired", "req": false, "short": "Air date range", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "Cover", "req": false, "short": "Cover image path or URL.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "DescripTion", "req": false, "short": "Anime description", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "Duration", "req": false, "short": "Episode duration", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "Genres", "req": false, "short": "List of genres", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "ImagePath", "req": false, "short": "Image path or URL.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "MALScore", "req": false, "short": "MyAnimeList score", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "Name", "req": false, "short": "Anime name", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "Premiered", "req": false, "short": "Premiere season", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "RatingsNum", "req": false, "short": "Number of ratings", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "Status", "req": false, "short": "Airing status", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "Studios", "req": false, "short": "Production studio", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "Synonyms", "req": false, "short": "Alternative names", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "currentPage", "req": false, "short": "Current page number", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "name": "epCount", "req": false, "short": "Episode count", "type": "`$INTEGER`", "index$": 14 }, { "active": true, "name": "finder", "req": false, "short": "Slug identifier", "type": "`$STRING`", "index$": 15 }, { "active": true, "name": "id", "req": false, "short": "Anime ID", "type": "`$INTEGER`", "index$": 16 }, { "active": true, "name": "wholePage", "req": false, "short": "Array of anime on current page", "type": "`$ARRAY`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "paginated_anime_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "Action", "kind": "query", "name": "genre", "orig": "genre", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "One Piece", "kind": "query", "name": "name", "orig": "name", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "ratefrom", "orig": "ratefrom", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": 10, "kind": "query", "name": "rateto", "orig": "rateto", "reqd": false, "type": "`$NUMBER`", "index$": 4 }] }, "contract": { "id": "GET /api/sort", "json": "{\"operationId\":\"sortAnime\",\"parameters\":[{\"description\":\"Anime name filter\",\"example\":\"One Piece\",\"in\":\"query\",\"name\":\"name\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Genre filter\",\"example\":\"Action\",\"in\":\"query\",\"name\":\"genre\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Minimum rating\",\"example\":0,\"in\":\"query\",\"name\":\"ratefrom\",\"required\":false,\"schema\":{\"maximum\":10,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Maximum rating\",\"example\":10,\"in\":\"query\",\"name\":\"rateto\",\"required\":false,\"schema\":{\"maximum\":10,\"minimum\":0,\"type\":\"number\"}},{\"description\":\"Page number\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"wholePage\":{\"description\":\"Array of anime on current page\",\"items\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Filtered and sorted anime list\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/sort", "segments": [{ "lit": "api" }, { "lit": "sort" }], "select": { "exist": ["genre", "name", "page", "ratefrom", "rateto"] }, "transform": { "req": "`reqdata`", "res": "`body.wholePage`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "harem", "kind": "param", "name": "genre", "orig": "genre", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/findbyGenre/{genre}", "json": "{\"operationId\":\"findByGenre\",\"parameters\":[{\"description\":\"Genre name (e.g., harem, action, romance)\",\"example\":\"harem\",\"in\":\"path\",\"name\":\"genre\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number, default 1\",\"in\":\"query\",\"name\":\"Page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"wholePage\":{\"description\":\"Array of anime on current page\",\"items\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Paginated list of anime by genre\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/findbyGenre/{genre}", "segments": [{ "lit": "api" }, { "lit": "findbyGenre" }, { "var": "genre" }], "select": { "exist": ["genre", "page"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "name", "orig": "name", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/searchall/{name}", "json": "{\"operationId\":\"searchAll\",\"parameters\":[{\"description\":\"Search query\",\"in\":\"path\",\"name\":\"name\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number, default 1\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"},\"wholePage\":{\"description\":\"Array of anime on current page\",\"items\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Paginated search results\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/searchall/{name}", "segments": [{ "lit": "api" }, { "lit": "searchall" }, { "var": "name" }], "select": { "exist": ["name", "page"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["findby_genre"], ["searchall"]] }, "key$": "paginated_anime_list", "name__orig": "paginated_anime_list", "Name": "PaginatedAnimeList", "name_": "paginated_anime_list", "name-": "paginated-anime-list", "NAME": "PAGINATED_ANIME_LIST", "index$": 4 }, { "active": true, "entity": "paginated_anime_list", "key$": "BasicPaginatedAnimeListFlow", "kind": "basic", "name": "BasicPaginatedAnimeListFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "paginated_anime_list_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "paginated_anime_list_ref01", "srcdatavar": "paginated_anime_list_ref01_data", "suffix": "_dt0" }, "match": { "id": "paginated_anime_list01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-paginated_anime_list_ref01" } }], "index$": 1 }] }, 'PaginatedAnimeList');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let paginated_anime_list_ref01_data = Object.values(setup.data.existing.paginated_anime_list)[0];
        // LIST
        const paginated_anime_list_ref01_ent = client.PaginatedAnimeList();
        const paginated_anime_list_ref01_match = {};
        const paginated_anime_list_ref01_list = (await paginated_anime_list_ref01_ent.list(paginated_anime_list_ref01_match)).map((e) => e.data());
        // LOAD
        const paginated_anime_list_ref01_match_dt0 = {};
        paginated_anime_list_ref01_match_dt0.id = paginated_anime_list_ref01_data.id;
        const paginated_anime_list_ref01_data_dt0 = (await paginated_anime_list_ref01_ent.load(paginated_anime_list_ref01_match_dt0)).data();
        (0, node_assert_1.default)(paginated_anime_list_ref01_data_dt0.id === paginated_anime_list_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/paginated_anime_list/PaginatedAnimeListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnipubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['paginated_anime_list01', 'paginated_anime_list02', 'paginated_anime_list03', 'findby_genre01', 'findby_genre02', 'findby_genre03', 'searchall01', 'searchall02', 'searchall03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANIPUB_TEST_PAGINATED_ANIME_LIST_ENTID': idmap,
        'ANIPUB_TEST_LIVE': 'FALSE',
        'ANIPUB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANIPUB_TEST_PAGINATED_ANIME_LIST_ENTID'];
    const live = 'TRUE' === env.ANIPUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANIPUB_TEST_PAGINATED_ANIME_LIST_ENTID'];
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
//# sourceMappingURL=PaginatedAnimeListEntity.test.js.map