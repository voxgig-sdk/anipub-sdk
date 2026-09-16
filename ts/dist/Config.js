"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Anipub',
        slug: "anipub",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://anipub.xyz",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            anime: {},
            find: {},
            full_anime_detail: {},
            info: {},
            paginated_anime_list: {},
            rating: {},
            search: {},
            streaming_detail: {},
        }
    };
    entity = {
        "anime": {
            "fields": [
                {
                    "name": "Genre",
                    "req": true,
                    "short": "Genre as string or array of strings",
                    "type": "`$ANY`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 0
                    }
                },
                {
                    "name": "Name",
                    "req": true,
                    "short": "Anime name to match",
                    "type": "`$STRING`"
                },
                {
                    "name": "exists",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "anime",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/check",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "check"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "check"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/getAll",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "getAll"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "getAll"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/getlast",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "getlast"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "getlast"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "find": {
            "fields": [
                {
                    "name": "ep",
                    "short": "Episode count if found",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "exist",
                    "req": true,
                    "short": "Whether anime exists",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "short": "Anime ID if found",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "find",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "One Piece",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/find/{name}",
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "find"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "find",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "full_anime_detail": {
            "fields": [
                {
                    "name": "characters",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "jikan",
                    "short": "MyAnimeList data from Jikan API",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "local",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "full_anime_detail",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": 119,
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/anime/api/details/{id}",
                            "segments": [
                                {
                                    "lit": "anime"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "details"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "anime",
                                "api",
                                "details",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "info": {
            "fields": [
                {
                    "name": "Aired",
                    "short": "Air date range",
                    "type": "`$STRING`"
                },
                {
                    "name": "Cover",
                    "short": "Cover image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "DescripTion",
                    "short": "Anime description",
                    "type": "`$STRING`"
                },
                {
                    "name": "Duration",
                    "short": "Episode duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "Genres",
                    "short": "List of genres",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "ImagePath",
                    "short": "Image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "MALScore",
                    "short": "MyAnimeList score",
                    "type": "`$STRING`"
                },
                {
                    "name": "Name",
                    "short": "Anime name",
                    "type": "`$STRING`"
                },
                {
                    "name": "Premiered",
                    "short": "Premiere season",
                    "type": "`$STRING`"
                },
                {
                    "name": "RatingsNum",
                    "short": "Number of ratings",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "Status",
                    "short": "Airing status",
                    "type": "`$STRING`"
                },
                {
                    "name": "Studios",
                    "short": "Production studio",
                    "type": "`$STRING`"
                },
                {
                    "name": "Synonyms",
                    "short": "Alternative names",
                    "type": "`$STRING`"
                },
                {
                    "name": "epCount",
                    "short": "Episode count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "finder",
                    "short": "Slug identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Anime ID",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "info",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "black-clover",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/info/{id}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "info"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "info",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "paginated_anime_list": {
            "fields": [
                {
                    "name": "Aired",
                    "short": "Air date range",
                    "type": "`$STRING`"
                },
                {
                    "name": "Cover",
                    "short": "Cover image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "DescripTion",
                    "short": "Anime description",
                    "type": "`$STRING`"
                },
                {
                    "name": "Duration",
                    "short": "Episode duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "Genres",
                    "short": "List of genres",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "ImagePath",
                    "short": "Image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "MALScore",
                    "short": "MyAnimeList score",
                    "type": "`$STRING`"
                },
                {
                    "name": "Name",
                    "short": "Anime name",
                    "type": "`$STRING`"
                },
                {
                    "name": "Premiered",
                    "short": "Premiere season",
                    "type": "`$STRING`"
                },
                {
                    "name": "RatingsNum",
                    "short": "Number of ratings",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "Status",
                    "short": "Airing status",
                    "type": "`$STRING`"
                },
                {
                    "name": "Studios",
                    "short": "Production studio",
                    "type": "`$STRING`"
                },
                {
                    "name": "Synonyms",
                    "short": "Alternative names",
                    "type": "`$STRING`"
                },
                {
                    "name": "currentPage",
                    "short": "Current page number",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "epCount",
                    "short": "Episode count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "finder",
                    "short": "Slug identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Anime ID",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "wholePage",
                    "short": "Array of anime on current page",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "paginated_anime_list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "Action",
                                        "kind": "query",
                                        "name": "genre",
                                        "orig": "genre",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "One Piece",
                                        "kind": "query",
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "ratefrom",
                                        "orig": "ratefrom",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "rateto",
                                        "orig": "rateto",
                                        "type": "`$NUMBER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/sort",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "sort"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "genre",
                                    "name",
                                    "page",
                                    "ratefrom",
                                    "rateto"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.wholePage`"
                            },
                            "parts": [
                                "api",
                                "sort"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "harem",
                                        "kind": "param",
                                        "name": "genre",
                                        "orig": "genre",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/findbyGenre/{genre}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "findbyGenre"
                                },
                                {
                                    "var": "genre"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "genre",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "findbyGenre",
                                "{genre}"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "name",
                                        "orig": "name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/searchall/{name}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "searchall"
                                },
                                {
                                    "var": "name"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "name",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "searchall",
                                "{name}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "findby_genre"
                    ],
                    [
                        "searchall"
                    ]
                ]
            }
        },
        "rating": {
            "fields": [
                {
                    "name": "Aired",
                    "short": "Air date range",
                    "type": "`$STRING`"
                },
                {
                    "name": "Cover",
                    "short": "Cover image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "DescripTion",
                    "short": "Anime description",
                    "type": "`$STRING`"
                },
                {
                    "name": "Duration",
                    "short": "Episode duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "Genres",
                    "short": "List of genres",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "ImagePath",
                    "short": "Image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "MALScore",
                    "short": "MyAnimeList score",
                    "type": "`$STRING`"
                },
                {
                    "name": "Name",
                    "short": "Anime name",
                    "type": "`$STRING`"
                },
                {
                    "name": "Premiered",
                    "short": "Premiere season",
                    "type": "`$STRING`"
                },
                {
                    "name": "RatingsNum",
                    "short": "Number of ratings",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "Status",
                    "short": "Airing status",
                    "type": "`$STRING`"
                },
                {
                    "name": "Studios",
                    "short": "Production studio",
                    "type": "`$STRING`"
                },
                {
                    "name": "Synonyms",
                    "short": "Alternative names",
                    "type": "`$STRING`"
                },
                {
                    "name": "epCount",
                    "short": "Episode count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "finder",
                    "short": "Slug identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Anime ID",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "rating",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/findbyrating",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "findbyrating"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.AniData`"
                            },
                            "parts": [
                                "api",
                                "findbyrating"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "search": {
            "fields": [
                {
                    "name": "Aired",
                    "short": "Air date range",
                    "type": "`$STRING`"
                },
                {
                    "name": "Cover",
                    "short": "Cover image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "DescripTion",
                    "short": "Anime description",
                    "type": "`$STRING`"
                },
                {
                    "name": "Duration",
                    "short": "Episode duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "Genres",
                    "short": "List of genres",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "ImagePath",
                    "short": "Image path or URL.",
                    "type": "`$STRING`"
                },
                {
                    "name": "MALScore",
                    "short": "MyAnimeList score",
                    "type": "`$STRING`"
                },
                {
                    "name": "Name",
                    "short": "Anime name",
                    "type": "`$STRING`"
                },
                {
                    "name": "Premiered",
                    "short": "Premiere season",
                    "type": "`$STRING`"
                },
                {
                    "name": "RatingsNum",
                    "short": "Number of ratings",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "Status",
                    "short": "Airing status",
                    "type": "`$STRING`"
                },
                {
                    "name": "Studios",
                    "short": "Production studio",
                    "type": "`$STRING`"
                },
                {
                    "name": "Synonyms",
                    "short": "Alternative names",
                    "type": "`$STRING`"
                },
                {
                    "name": "epCount",
                    "short": "Episode count",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "finder",
                    "short": "Slug identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Anime ID",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "search",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "name",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/search/{name}",
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "search"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "search",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "streaming_detail": {
            "fields": [
                {
                    "name": "ep",
                    "short": "Episodes 2+ streaming links",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "link",
                    "short": "Episode 1 streaming link with src= prefix",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Anime name",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "streaming_detail",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": 119,
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/api/details/{id}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "details"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.local`"
                            },
                            "parts": [
                                "v1",
                                "api",
                                "details",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map