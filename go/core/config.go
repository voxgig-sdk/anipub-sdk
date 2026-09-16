package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Anipub",
			"slug": "anipub",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://anipub.xyz",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"anime": map[string]any{},
				"find": map[string]any{},
				"full_anime_detail": map[string]any{},
				"info": map[string]any{},
				"paginated_anime_list": map[string]any{},
				"rating": map[string]any{},
				"search": map[string]any{},
				"streaming_detail": map[string]any{},
			},
		},
		"entity": map[string]any{
			"anime": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Genre",
						"req": true,
						"short": "Genre as string or array of strings",
						"type": "`$ANY`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 0,
						},
					},
					map[string]any{
						"name": "Name",
						"req": true,
						"short": "Anime name to match",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exists",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "anime",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/check",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "check",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"check",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/getAll",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "getAll",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"getAll",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/getlast",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "getlast",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"getlast",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"find": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ep",
						"short": "Episode count if found",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "exist",
						"req": true,
						"short": "Whether anime exists",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "Anime ID if found",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "find",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "One Piece",
											"kind": "param",
											"name": "id",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/find/{name}",
								"rename": map[string]any{
									"param": map[string]any{
										"name": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "find",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"find",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"full_anime_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "characters",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jikan",
						"short": "MyAnimeList data from Jikan API",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "local",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "full_anime_detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 119,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/anime/api/details/{id}",
								"segments": []any{
									map[string]any{
										"lit": "anime",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "details",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"anime",
									"api",
									"details",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"short": "Air date range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"short": "Cover image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"short": "Anime description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"short": "Episode duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"short": "List of genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"short": "Image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"short": "MyAnimeList score",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"short": "Anime name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"short": "Premiere season",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"short": "Number of ratings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"short": "Airing status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"short": "Production studio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"short": "Alternative names",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"short": "Episode count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"short": "Slug identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Anime ID",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "black-clover",
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/info/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "info",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"info",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"paginated_anime_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"short": "Air date range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"short": "Cover image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"short": "Anime description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"short": "Episode duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"short": "List of genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"short": "Image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"short": "MyAnimeList score",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"short": "Anime name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"short": "Premiere season",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"short": "Number of ratings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"short": "Airing status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"short": "Production studio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"short": "Alternative names",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currentPage",
						"short": "Current page number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "epCount",
						"short": "Episode count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"short": "Slug identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Anime ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wholePage",
						"short": "Array of anime on current page",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "paginated_anime_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Action",
											"kind": "query",
											"name": "genre",
											"orig": "genre",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "One Piece",
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "ratefrom",
											"orig": "ratefrom",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "rateto",
											"orig": "rateto",
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/sort",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "sort",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"genre",
										"name",
										"page",
										"ratefrom",
										"rateto",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.wholePage`",
								},
								"parts": []any{
									"api",
									"sort",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "harem",
											"kind": "param",
											"name": "genre",
											"orig": "genre",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/findbyGenre/{genre}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "findbyGenre",
									},
									map[string]any{
										"var": "genre",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"genre",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"findbyGenre",
									"{genre}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "name",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/searchall/{name}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "searchall",
									},
									map[string]any{
										"var": "name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"searchall",
									"{name}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"findby_genre",
						},
						[]any{
							"searchall",
						},
					},
				},
			},
			"rating": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"short": "Air date range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"short": "Cover image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"short": "Anime description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"short": "Episode duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"short": "List of genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"short": "Image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"short": "MyAnimeList score",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"short": "Anime name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"short": "Premiere season",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"short": "Number of ratings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"short": "Airing status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"short": "Production studio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"short": "Alternative names",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"short": "Episode count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"short": "Slug identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Anime ID",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "rating",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/findbyrating",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "findbyrating",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.AniData`",
								},
								"parts": []any{
									"api",
									"findbyrating",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"short": "Air date range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"short": "Cover image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"short": "Anime description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"short": "Episode duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"short": "List of genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"short": "Image path or URL.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"short": "MyAnimeList score",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"short": "Anime name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"short": "Premiere season",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"short": "Number of ratings",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"short": "Airing status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"short": "Production studio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"short": "Alternative names",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"short": "Episode count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"short": "Slug identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Anime ID",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/search/{name}",
								"rename": map[string]any{
									"param": map[string]any{
										"name": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"search",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"streaming_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ep",
						"short": "Episodes 2+ streaming links",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"short": "Episode 1 streaming link with src= prefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Anime name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "streaming_detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 119,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/api/details/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "details",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.local`",
								},
								"parts": []any{
									"v1",
									"api",
									"details",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
