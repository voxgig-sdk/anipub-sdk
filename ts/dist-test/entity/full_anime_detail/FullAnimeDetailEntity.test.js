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
(0, node_test_1.describe)('FullAnimeDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANIPUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnipubSDK.test();
        const ent = testsdk.FullAnimeDetail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'full_anime_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "characters", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "jikan", "req": false, "short": "MyAnimeList data from Jikan API", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "local", "req": false, "type": "`$OBJECT`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "full_anime_detail", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 119, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /anime/api/details/{id}", "json": "{\"operationId\":\"getFullDetails\",\"parameters\":[{\"description\":\"Anime ID\",\"example\":119,\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"characters\":{\"items\":{\"properties\":{\"character\":{\"properties\":{\"image_url\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"role\":{\"description\":\"Character role (e.g., Main, Supporting)\",\"type\":\"string\"},\"voice_actors\":{\"items\":{\"properties\":{\"language\":{\"type\":\"string\"},\"person\":{\"properties\":{\"image_url\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"jikan\":{\"description\":\"MyAnimeList data from Jikan API\",\"properties\":{\"popularity\":{\"type\":\"integer\"},\"rank\":{\"type\":\"integer\"},\"score\":{\"type\":\"number\"},\"scored_by\":{\"type\":\"integer\"},\"synopsis\":{\"type\":\"string\"}},\"type\":\"object\"},\"local\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Full anime details including MAL data and characters\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Anime not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/anime/api/details/{id}", "segments": [{ "lit": "anime" }, { "lit": "api" }, { "lit": "details" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "full_anime_detail", "name__orig": "full_anime_detail", "Name": "FullAnimeDetail", "name_": "full_anime_detail", "name-": "full-anime-detail", "NAME": "FULL_ANIME_DETAIL", "index$": 2 }, { "active": true, "entity": "full_anime_detail", "key$": "BasicFullAnimeDetailFlow", "kind": "basic", "name": "BasicFullAnimeDetailFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "full_anime_detail_ref01", "srcdatavar": "full_anime_detail_ref01_data", "suffix": "_dt0" }, "match": { "id": "full_anime_detail01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-full_anime_detail_ref01" } }], "index$": 0 }] }, 'FullAnimeDetail');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let full_anime_detail_ref01_data = Object.values(setup.data.existing.full_anime_detail)[0];
        // LOAD
        const full_anime_detail_ref01_ent = client.FullAnimeDetail();
        const full_anime_detail_ref01_match_dt0 = {};
        full_anime_detail_ref01_match_dt0.id = full_anime_detail_ref01_data.id;
        const full_anime_detail_ref01_data_dt0 = (await full_anime_detail_ref01_ent.load(full_anime_detail_ref01_match_dt0)).data();
        (0, node_assert_1.default)(full_anime_detail_ref01_data_dt0.id === full_anime_detail_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/full_anime_detail/FullAnimeDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnipubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['full_anime_detail01', 'full_anime_detail02', 'full_anime_detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID': idmap,
        'ANIPUB_TEST_LIVE': 'FALSE',
        'ANIPUB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID'];
    const live = 'TRUE' === env.ANIPUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID'];
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
//# sourceMappingURL=FullAnimeDetailEntity.test.js.map