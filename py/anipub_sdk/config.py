# Anipub SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Anipub",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://anipub.xyz",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "anime": {},
                "find": {},
                "full_anime_detail": {},
                "info": {},
                "paginated_anime_list": {},
                "rating": {},
                "search": {},
                "streaming_detail": {},
            },
        },
        "entity": {
      "anime": {
        "fields": [
          {
            "name": "Genre",
            "req": True,
            "type": "`$ANY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
          {
            "name": "Name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "exists",
            "type": "`$BOOLEAN`",
          },
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
                "parts": [
                  "api",
                  "check",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                "parts": [
                  "api",
                  "getAll",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/getlast",
                "parts": [
                  "api",
                  "getlast",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "find": {
        "fields": [
          {
            "name": "ep",
            "type": "`$INTEGER`",
          },
          {
            "name": "exist",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/find/{name}",
                "parts": [
                  "api",
                  "find",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "name": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "full_anime_detail": {
        "fields": [
          {
            "name": "characters",
            "type": "`$ARRAY`",
          },
          {
            "name": "jikan",
            "type": "`$OBJECT`",
          },
          {
            "name": "local",
            "type": "`$OBJECT`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/anime/api/details/{id}",
                "parts": [
                  "anime",
                  "api",
                  "details",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "info": {
        "fields": [
          {
            "name": "Aired",
            "type": "`$STRING`",
          },
          {
            "name": "Cover",
            "type": "`$STRING`",
          },
          {
            "name": "DescripTion",
            "type": "`$STRING`",
          },
          {
            "name": "Duration",
            "type": "`$STRING`",
          },
          {
            "name": "Genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "ImagePath",
            "type": "`$STRING`",
          },
          {
            "name": "MALScore",
            "type": "`$STRING`",
          },
          {
            "name": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "Premiered",
            "type": "`$STRING`",
          },
          {
            "name": "RatingsNum",
            "type": "`$INTEGER`",
          },
          {
            "name": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "Studios",
            "type": "`$STRING`",
          },
          {
            "name": "Synonyms",
            "type": "`$STRING`",
          },
          {
            "name": "epCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "finder",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/info/{id}",
                "parts": [
                  "api",
                  "info",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "paginated_anime_list": {
        "fields": [
          {
            "name": "Aired",
            "type": "`$STRING`",
          },
          {
            "name": "Cover",
            "type": "`$STRING`",
          },
          {
            "name": "DescripTion",
            "type": "`$STRING`",
          },
          {
            "name": "Duration",
            "type": "`$STRING`",
          },
          {
            "name": "Genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "ImagePath",
            "type": "`$STRING`",
          },
          {
            "name": "MALScore",
            "type": "`$STRING`",
          },
          {
            "name": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "Premiered",
            "type": "`$STRING`",
          },
          {
            "name": "RatingsNum",
            "type": "`$INTEGER`",
          },
          {
            "name": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "Studios",
            "type": "`$STRING`",
          },
          {
            "name": "Synonyms",
            "type": "`$STRING`",
          },
          {
            "name": "currentPage",
            "type": "`$INTEGER`",
          },
          {
            "name": "epCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "finder",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "wholePage",
            "type": "`$ARRAY`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "One Piece",
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "ratefrom",
                      "orig": "ratefrom",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "rateto",
                      "orig": "rateto",
                      "type": "`$NUMBER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/sort",
                "parts": [
                  "api",
                  "sort",
                ],
                "select": {
                  "exist": [
                    "genre",
                    "name",
                    "page",
                    "ratefrom",
                    "rateto",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.wholePage`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/findbyGenre/{genre}",
                "parts": [
                  "api",
                  "findbyGenre",
                  "{genre}",
                ],
                "select": {
                  "exist": [
                    "genre",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/searchall/{name}",
                "parts": [
                  "api",
                  "searchall",
                  "{name}",
                ],
                "select": {
                  "exist": [
                    "name",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "findby_genre",
            ],
            [
              "searchall",
            ],
          ],
        },
      },
      "rating": {
        "fields": [
          {
            "name": "Aired",
            "type": "`$STRING`",
          },
          {
            "name": "Cover",
            "type": "`$STRING`",
          },
          {
            "name": "DescripTion",
            "type": "`$STRING`",
          },
          {
            "name": "Duration",
            "type": "`$STRING`",
          },
          {
            "name": "Genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "ImagePath",
            "type": "`$STRING`",
          },
          {
            "name": "MALScore",
            "type": "`$STRING`",
          },
          {
            "name": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "Premiered",
            "type": "`$STRING`",
          },
          {
            "name": "RatingsNum",
            "type": "`$INTEGER`",
          },
          {
            "name": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "Studios",
            "type": "`$STRING`",
          },
          {
            "name": "Synonyms",
            "type": "`$STRING`",
          },
          {
            "name": "epCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "finder",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
        ],
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
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/findbyrating",
                "parts": [
                  "api",
                  "findbyrating",
                ],
                "select": {
                  "exist": [
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.AniData`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "Aired",
            "type": "`$STRING`",
          },
          {
            "name": "Cover",
            "type": "`$STRING`",
          },
          {
            "name": "DescripTion",
            "type": "`$STRING`",
          },
          {
            "name": "Duration",
            "type": "`$STRING`",
          },
          {
            "name": "Genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "ImagePath",
            "type": "`$STRING`",
          },
          {
            "name": "MALScore",
            "type": "`$STRING`",
          },
          {
            "name": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "Premiered",
            "type": "`$STRING`",
          },
          {
            "name": "RatingsNum",
            "type": "`$INTEGER`",
          },
          {
            "name": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "Studios",
            "type": "`$STRING`",
          },
          {
            "name": "Synonyms",
            "type": "`$STRING`",
          },
          {
            "name": "epCount",
            "type": "`$INTEGER`",
          },
          {
            "name": "finder",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/search/{name}",
                "parts": [
                  "api",
                  "search",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "name": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "streaming_detail": {
        "fields": [
          {
            "name": "ep",
            "type": "`$ARRAY`",
          },
          {
            "name": "link",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/api/details/{id}",
                "parts": [
                  "v1",
                  "api",
                  "details",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.local`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
