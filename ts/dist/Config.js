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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
            findby_genre: {},
            full_anime_detail: {},
            info: {},
            rating: {},
            search: {},
            searchall: {},
            sort: {},
            streaming_detail: {},
        }
    };
    entity = {
        "anime": {
            "fields": [
                {
                    "name": "Genre",
                    "title": "Genre",
                    "type": "`$ANY`",
                    "req": true,
                    "short": "Genre as string or array of strings"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Anime name to match"
                },
                {
                    "name": "exists",
                    "title": "Exists",
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
                            "parts": [
                                "api",
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "api",
                                "getAll"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        },
                        {
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
                            "parts": [
                                "api",
                                "getlast"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "Ep",
                    "type": "`$INTEGER`",
                    "short": "Episode count if found"
                },
                {
                    "name": "exist",
                    "title": "Exist",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "Whether anime exists"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Anime ID if found"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/find/{name}",
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
                            "parts": [
                                "api",
                                "find",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "One Piece"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "findby_genre": {
            "fields": [
                {
                    "name": "currentPage",
                    "title": "Current Page",
                    "type": "`$INTEGER`",
                    "short": "Current page number"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "wholePage",
                    "title": "Whole Page",
                    "type": "`$ARRAY`",
                    "short": "Array of anime on current page"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "findby_genre",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "findbyGenre",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "genre": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "genre",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "harem"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "page"
                                ]
                            }
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
                    "title": "Characters",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "jikan",
                    "title": "Jikan",
                    "type": "`$OBJECT`",
                    "short": "MyAnimeList data from Jikan API"
                },
                {
                    "name": "local",
                    "title": "Local",
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
                            "parts": [
                                "anime",
                                "api",
                                "details",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 119
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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
                    "title": "Aired",
                    "type": "`$STRING`",
                    "short": "Air date range"
                },
                {
                    "name": "Cover",
                    "title": "Cover",
                    "type": "`$STRING`",
                    "short": "Cover image path or URL."
                },
                {
                    "name": "DescripTion",
                    "title": "Descrip Tion",
                    "type": "`$STRING`",
                    "short": "Anime description"
                },
                {
                    "name": "Duration",
                    "title": "Duration",
                    "type": "`$STRING`",
                    "short": "Episode duration"
                },
                {
                    "name": "Genres",
                    "title": "Genres",
                    "type": "`$ARRAY`",
                    "short": "List of genres"
                },
                {
                    "name": "ImagePath",
                    "title": "Image Path",
                    "type": "`$STRING`",
                    "short": "Image path or URL."
                },
                {
                    "name": "MALScore",
                    "title": "Mal Score",
                    "type": "`$STRING`",
                    "short": "MyAnimeList score"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Anime name"
                },
                {
                    "name": "Premiered",
                    "title": "Premiered",
                    "type": "`$STRING`",
                    "short": "Premiere season"
                },
                {
                    "name": "RatingsNum",
                    "title": "Ratings Num",
                    "type": "`$INTEGER`",
                    "short": "Number of ratings"
                },
                {
                    "name": "Status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Airing status"
                },
                {
                    "name": "Studios",
                    "title": "Studios",
                    "type": "`$STRING`",
                    "short": "Production studio"
                },
                {
                    "name": "Synonyms",
                    "title": "Synonyms",
                    "type": "`$STRING`",
                    "short": "Alternative names"
                },
                {
                    "name": "epCount",
                    "title": "Ep Count",
                    "type": "`$INTEGER`",
                    "short": "Episode count"
                },
                {
                    "name": "finder",
                    "title": "Finder",
                    "type": "`$STRING`",
                    "short": "Slug identifier"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Anime ID"
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
                            "parts": [
                                "api",
                                "info",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "black-clover"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "rating": {
            "fields": [
                {
                    "name": "Aired",
                    "title": "Aired",
                    "type": "`$STRING`",
                    "short": "Air date range"
                },
                {
                    "name": "Cover",
                    "title": "Cover",
                    "type": "`$STRING`",
                    "short": "Cover image path or URL."
                },
                {
                    "name": "DescripTion",
                    "title": "Descrip Tion",
                    "type": "`$STRING`",
                    "short": "Anime description"
                },
                {
                    "name": "Duration",
                    "title": "Duration",
                    "type": "`$STRING`",
                    "short": "Episode duration"
                },
                {
                    "name": "Genres",
                    "title": "Genres",
                    "type": "`$ARRAY`",
                    "short": "List of genres"
                },
                {
                    "name": "ImagePath",
                    "title": "Image Path",
                    "type": "`$STRING`",
                    "short": "Image path or URL."
                },
                {
                    "name": "MALScore",
                    "title": "Mal Score",
                    "type": "`$STRING`",
                    "short": "MyAnimeList score"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Anime name"
                },
                {
                    "name": "Premiered",
                    "title": "Premiered",
                    "type": "`$STRING`",
                    "short": "Premiere season"
                },
                {
                    "name": "RatingsNum",
                    "title": "Ratings Num",
                    "type": "`$INTEGER`",
                    "short": "Number of ratings"
                },
                {
                    "name": "Status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Airing status"
                },
                {
                    "name": "Studios",
                    "title": "Studios",
                    "type": "`$STRING`",
                    "short": "Production studio"
                },
                {
                    "name": "Synonyms",
                    "title": "Synonyms",
                    "type": "`$STRING`",
                    "short": "Alternative names"
                },
                {
                    "name": "epCount",
                    "title": "Ep Count",
                    "type": "`$INTEGER`",
                    "short": "Episode count"
                },
                {
                    "name": "finder",
                    "title": "Finder",
                    "type": "`$STRING`",
                    "short": "Slug identifier"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Anime ID"
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
                            "parts": [
                                "api",
                                "findbyrating"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.AniData`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "page"
                                ]
                            }
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
                    "title": "Aired",
                    "type": "`$STRING`",
                    "short": "Air date range"
                },
                {
                    "name": "Cover",
                    "title": "Cover",
                    "type": "`$STRING`",
                    "short": "Cover image path or URL."
                },
                {
                    "name": "DescripTion",
                    "title": "Descrip Tion",
                    "type": "`$STRING`",
                    "short": "Anime description"
                },
                {
                    "name": "Duration",
                    "title": "Duration",
                    "type": "`$STRING`",
                    "short": "Episode duration"
                },
                {
                    "name": "Genres",
                    "title": "Genres",
                    "type": "`$ARRAY`",
                    "short": "List of genres"
                },
                {
                    "name": "ImagePath",
                    "title": "Image Path",
                    "type": "`$STRING`",
                    "short": "Image path or URL."
                },
                {
                    "name": "MALScore",
                    "title": "Mal Score",
                    "type": "`$STRING`",
                    "short": "MyAnimeList score"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Anime name"
                },
                {
                    "name": "Premiered",
                    "title": "Premiered",
                    "type": "`$STRING`",
                    "short": "Premiere season"
                },
                {
                    "name": "RatingsNum",
                    "title": "Ratings Num",
                    "type": "`$INTEGER`",
                    "short": "Number of ratings"
                },
                {
                    "name": "Status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Airing status"
                },
                {
                    "name": "Studios",
                    "title": "Studios",
                    "type": "`$STRING`",
                    "short": "Production studio"
                },
                {
                    "name": "Synonyms",
                    "title": "Synonyms",
                    "type": "`$STRING`",
                    "short": "Alternative names"
                },
                {
                    "name": "epCount",
                    "title": "Ep Count",
                    "type": "`$INTEGER`",
                    "short": "Episode count"
                },
                {
                    "name": "finder",
                    "title": "Finder",
                    "type": "`$STRING`",
                    "short": "Slug identifier"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Anime ID"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/search/{name}",
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
                            "parts": [
                                "api",
                                "search",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "searchall": {
            "fields": [
                {
                    "name": "currentPage",
                    "title": "Current Page",
                    "type": "`$INTEGER`",
                    "short": "Current page number"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "wholePage",
                    "title": "Whole Page",
                    "type": "`$ARRAY`",
                    "short": "Array of anime on current page"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "searchall",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "api",
                                "searchall",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "name": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "page"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "sort": {
            "fields": [
                {
                    "name": "Aired",
                    "title": "Aired",
                    "type": "`$STRING`",
                    "short": "Air date range"
                },
                {
                    "name": "Cover",
                    "title": "Cover",
                    "type": "`$STRING`",
                    "short": "Cover image path or URL."
                },
                {
                    "name": "DescripTion",
                    "title": "Descrip Tion",
                    "type": "`$STRING`",
                    "short": "Anime description"
                },
                {
                    "name": "Duration",
                    "title": "Duration",
                    "type": "`$STRING`",
                    "short": "Episode duration"
                },
                {
                    "name": "Genres",
                    "title": "Genres",
                    "type": "`$ARRAY`",
                    "short": "List of genres"
                },
                {
                    "name": "ImagePath",
                    "title": "Image Path",
                    "type": "`$STRING`",
                    "short": "Image path or URL."
                },
                {
                    "name": "MALScore",
                    "title": "Mal Score",
                    "type": "`$STRING`",
                    "short": "MyAnimeList score"
                },
                {
                    "name": "Name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Anime name"
                },
                {
                    "name": "Premiered",
                    "title": "Premiered",
                    "type": "`$STRING`",
                    "short": "Premiere season"
                },
                {
                    "name": "RatingsNum",
                    "title": "Ratings Num",
                    "type": "`$INTEGER`",
                    "short": "Number of ratings"
                },
                {
                    "name": "Status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "short": "Airing status"
                },
                {
                    "name": "Studios",
                    "title": "Studios",
                    "type": "`$STRING`",
                    "short": "Production studio"
                },
                {
                    "name": "Synonyms",
                    "title": "Synonyms",
                    "type": "`$STRING`",
                    "short": "Alternative names"
                },
                {
                    "name": "epCount",
                    "title": "Ep Count",
                    "type": "`$INTEGER`",
                    "short": "Episode count"
                },
                {
                    "name": "finder",
                    "title": "Finder",
                    "type": "`$STRING`",
                    "short": "Slug identifier"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Anime ID"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "sort",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "api",
                                "sort"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.wholePage`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "genre",
                                        "orig": "genre",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "Action"
                                    },
                                    {
                                        "name": "name",
                                        "orig": "name",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "One Piece"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "ratefrom",
                                        "orig": "ratefrom",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "rateto",
                                        "orig": "rateto",
                                        "type": "`$NUMBER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "genre",
                                    "name",
                                    "page",
                                    "ratefrom",
                                    "rateto"
                                ]
                            }
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
                    "title": "Ep",
                    "type": "`$ARRAY`",
                    "short": "Episodes 2+ streaming links"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "link",
                    "title": "Link",
                    "type": "`$STRING`",
                    "short": "Episode 1 streaming link with src= prefix"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Anime name"
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
                            "parts": [
                                "v1",
                                "api",
                                "details",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.local`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 119
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
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