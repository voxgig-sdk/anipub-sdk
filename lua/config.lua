-- Anipub SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Anipub",
      slug = "anipub",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://anipub.xyz",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["anime"] = {},
        ["find"] = {},
        ["full_anime_detail"] = {},
        ["info"] = {},
        ["paginated_anime_list"] = {},
        ["rating"] = {},
        ["search"] = {},
        ["streaming_detail"] = {},
      },
    },
    entity = {
      ["anime"] = {
        ["fields"] = {
          {
            ["name"] = "Genre",
            ["req"] = true,
            ["short"] = "Genre as string or array of strings",
            ["type"] = "`$ANY`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 0,
            },
          },
          {
            ["name"] = "Name",
            ["req"] = true,
            ["short"] = "Anime name to match",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "exists",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "anime",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/check",
                ["parts"] = {
                  "api",
                  "check",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/getAll",
                ["parts"] = {
                  "api",
                  "getAll",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/getlast",
                ["parts"] = {
                  "api",
                  "getlast",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["find"] = {
        ["fields"] = {
          {
            ["name"] = "ep",
            ["short"] = "Episode count if found",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "exist",
            ["req"] = true,
            ["short"] = "Whether anime exists",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["short"] = "Anime ID if found",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "find",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "One Piece",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/find/{name}",
                ["parts"] = {
                  "api",
                  "find",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["name"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["full_anime_detail"] = {
        ["fields"] = {
          {
            ["name"] = "characters",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "jikan",
            ["short"] = "MyAnimeList data from Jikan API",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "local",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "full_anime_detail",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 119,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/anime/api/details/{id}",
                ["parts"] = {
                  "anime",
                  "api",
                  "details",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["info"] = {
        ["fields"] = {
          {
            ["name"] = "Aired",
            ["short"] = "Air date range",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Cover",
            ["short"] = "Cover image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "DescripTion",
            ["short"] = "Anime description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Duration",
            ["short"] = "Episode duration",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Genres",
            ["short"] = "List of genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "ImagePath",
            ["short"] = "Image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "MALScore",
            ["short"] = "MyAnimeList score",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Name",
            ["short"] = "Anime name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Premiered",
            ["short"] = "Premiere season",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingsNum",
            ["short"] = "Number of ratings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Status",
            ["short"] = "Airing status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Studios",
            ["short"] = "Production studio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Synonyms",
            ["short"] = "Alternative names",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "epCount",
            ["short"] = "Episode count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "finder",
            ["short"] = "Slug identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Anime ID",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "info",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "black-clover",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/info/{id}",
                ["parts"] = {
                  "api",
                  "info",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["paginated_anime_list"] = {
        ["fields"] = {
          {
            ["name"] = "Aired",
            ["short"] = "Air date range",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Cover",
            ["short"] = "Cover image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "DescripTion",
            ["short"] = "Anime description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Duration",
            ["short"] = "Episode duration",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Genres",
            ["short"] = "List of genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "ImagePath",
            ["short"] = "Image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "MALScore",
            ["short"] = "MyAnimeList score",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Name",
            ["short"] = "Anime name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Premiered",
            ["short"] = "Premiere season",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingsNum",
            ["short"] = "Number of ratings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Status",
            ["short"] = "Airing status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Studios",
            ["short"] = "Production studio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Synonyms",
            ["short"] = "Alternative names",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "currentPage",
            ["short"] = "Current page number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "epCount",
            ["short"] = "Episode count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "finder",
            ["short"] = "Slug identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Anime ID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "wholePage",
            ["short"] = "Array of anime on current page",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "paginated_anime_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "Action",
                      ["kind"] = "query",
                      ["name"] = "genre",
                      ["orig"] = "genre",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "One Piece",
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "ratefrom",
                      ["orig"] = "ratefrom",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "rateto",
                      ["orig"] = "rateto",
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/sort",
                ["parts"] = {
                  "api",
                  "sort",
                },
                ["select"] = {
                  ["exist"] = {
                    "genre",
                    "name",
                    "page",
                    "ratefrom",
                    "rateto",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.wholePage`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "harem",
                      ["kind"] = "param",
                      ["name"] = "genre",
                      ["orig"] = "genre",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/findbyGenre/{genre}",
                ["parts"] = {
                  "api",
                  "findbyGenre",
                  "{genre}",
                },
                ["select"] = {
                  ["exist"] = {
                    "genre",
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/searchall/{name}",
                ["parts"] = {
                  "api",
                  "searchall",
                  "{name}",
                },
                ["select"] = {
                  ["exist"] = {
                    "name",
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "findby_genre",
            },
            {
              "searchall",
            },
          },
        },
      },
      ["rating"] = {
        ["fields"] = {
          {
            ["name"] = "Aired",
            ["short"] = "Air date range",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Cover",
            ["short"] = "Cover image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "DescripTion",
            ["short"] = "Anime description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Duration",
            ["short"] = "Episode duration",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Genres",
            ["short"] = "List of genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "ImagePath",
            ["short"] = "Image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "MALScore",
            ["short"] = "MyAnimeList score",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Name",
            ["short"] = "Anime name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Premiered",
            ["short"] = "Premiere season",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingsNum",
            ["short"] = "Number of ratings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Status",
            ["short"] = "Airing status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Studios",
            ["short"] = "Production studio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Synonyms",
            ["short"] = "Alternative names",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "epCount",
            ["short"] = "Episode count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "finder",
            ["short"] = "Slug identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Anime ID",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "rating",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/findbyrating",
                ["parts"] = {
                  "api",
                  "findbyrating",
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.AniData`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["name"] = "Aired",
            ["short"] = "Air date range",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Cover",
            ["short"] = "Cover image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "DescripTion",
            ["short"] = "Anime description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Duration",
            ["short"] = "Episode duration",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Genres",
            ["short"] = "List of genres",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "ImagePath",
            ["short"] = "Image path or URL.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "MALScore",
            ["short"] = "MyAnimeList score",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Name",
            ["short"] = "Anime name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Premiered",
            ["short"] = "Premiere season",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "RatingsNum",
            ["short"] = "Number of ratings",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "Status",
            ["short"] = "Airing status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Studios",
            ["short"] = "Production studio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "Synonyms",
            ["short"] = "Alternative names",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "epCount",
            ["short"] = "Episode count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "finder",
            ["short"] = "Slug identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Anime ID",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "name",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/search/{name}",
                ["parts"] = {
                  "api",
                  "search",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["name"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["streaming_detail"] = {
        ["fields"] = {
          {
            ["name"] = "ep",
            ["short"] = "Episodes 2+ streaming links",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "link",
            ["short"] = "Episode 1 streaming link with src= prefix",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Anime name",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "streaming_detail",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 119,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/api/details/{id}",
                ["parts"] = {
                  "v1",
                  "api",
                  "details",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.local`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
