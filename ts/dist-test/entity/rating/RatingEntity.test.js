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
(0, node_test_1.describe)('RatingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANIPUB_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AnipubSDK.test();
        const ent = testsdk.Rating();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rating.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "Aired", "req": false, "short": "Air date range", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "Cover", "req": false, "short": "Cover image path or URL.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "DescripTion", "req": false, "short": "Anime description", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "Duration", "req": false, "short": "Episode duration", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "Genres", "req": false, "short": "List of genres", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "ImagePath", "req": false, "short": "Image path or URL.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "MALScore", "req": false, "short": "MyAnimeList score", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "Name", "req": false, "short": "Anime name", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "Premiered", "req": false, "short": "Premiere season", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "RatingsNum", "req": false, "short": "Number of ratings", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "Status", "req": false, "short": "Airing status", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "Studios", "req": false, "short": "Production studio", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "Synonyms", "req": false, "short": "Alternative names", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "epCount", "req": false, "short": "Episode count", "type": "`$INTEGER`", "index$": 13 }, { "active": true, "name": "finder", "req": false, "short": "Slug identifier", "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "id", "req": false, "short": "Anime ID", "type": "`$INTEGER`", "index$": 15 }], "id": { "field": "id", "name": "id" }, "name": "rating", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/findbyrating", "json": "{\"operationId\":\"findByRating\",\"parameters\":[{\"description\":\"Page number, default 1\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"AniData\":[{\"DescripTion\":\"...\",\"ImagePath\":\"https://...\",\"MALScore\":\"9.36\",\"Name\":\"Frieren: Beyond Journey's End\",\"RatingsNum\":50,\"_id\":2454,\"finder\":\"frieren-beyond-journeys-end\"}],\"currentPage\":1},\"schema\":{\"properties\":{\"AniData\":{\"description\":\"Array of top-rated anime\",\"items\":{\"properties\":{\"Aired\":{\"description\":\"Air date range\",\"type\":\"string\"},\"Cover\":{\"description\":\"Cover image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"DescripTion\":{\"description\":\"Anime description\",\"type\":\"string\"},\"Duration\":{\"description\":\"Episode duration\",\"type\":\"string\"},\"Genres\":{\"description\":\"List of genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"ImagePath\":{\"description\":\"Image path or URL. Prepend https://anipub.xyz/ if relative\",\"type\":\"string\"},\"MALScore\":{\"description\":\"MyAnimeList score\",\"type\":\"string\"},\"Name\":{\"description\":\"Anime name\",\"type\":\"string\"},\"Premiered\":{\"description\":\"Premiere season\",\"type\":\"string\"},\"RatingsNum\":{\"description\":\"Number of ratings\",\"type\":\"integer\"},\"Status\":{\"description\":\"Airing status\",\"type\":\"string\"},\"Studios\":{\"description\":\"Production studio\",\"type\":\"string\"},\"Synonyms\":{\"description\":\"Alternative names\",\"type\":\"string\"},\"_id\":{\"description\":\"Anime ID\",\"type\":\"integer\"},\"epCount\":{\"description\":\"Episode count\",\"type\":\"integer\"},\"finder\":{\"description\":\"Slug identifier\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currentPage\":{\"description\":\"Current page number\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Paginated list of top-rated anime\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/findbyrating", "segments": [{ "lit": "api" }, { "lit": "findbyrating" }], "select": { "exist": ["page"] }, "transform": { "req": "`reqdata`", "res": "`body.AniData`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "rating", "name__orig": "rating", "Name": "Rating", "name_": "rating", "name-": "rating", "NAME": "RATING", "index$": 5 }, { "active": true, "entity": "rating", "key$": "BasicRatingFlow", "kind": "basic", "name": "BasicRatingFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "rating_ref01" } }], "index$": 0 }] }, 'Rating');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rating_ref01_data = Object.values(setup.data.existing.rating)[0];
        // LIST
        const rating_ref01_ent = client.Rating();
        const rating_ref01_match = {};
        const rating_ref01_list = (await rating_ref01_ent.list(rating_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rating/RatingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AnipubSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rating01', 'rating02', 'rating03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANIPUB_TEST_RATING_ENTID': idmap,
        'ANIPUB_TEST_LIVE': 'FALSE',
        'ANIPUB_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ANIPUB_TEST_RATING_ENTID'];
    const live = 'TRUE' === env.ANIPUB_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANIPUB_TEST_RATING_ENTID'];
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
//# sourceMappingURL=RatingEntity.test.js.map