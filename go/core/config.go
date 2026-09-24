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
				"findby_genre": map[string]any{},
				"full_anime_detail": map[string]any{},
				"info": map[string]any{},
				"rating": map[string]any{},
				"search": map[string]any{},
				"searchall": map[string]any{},
				"sort": map[string]any{},
				"streaming_detail": map[string]any{},
			},
		},
		"entity": map[string]any{
			"anime": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Genre",
						"title": "Genre",
						"type": "`$ANY`",
						"req": true,
						"short": "Genre as string or array of strings",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Anime name to match",
					},
					map[string]any{
						"name": "exists",
						"title": "Exists",
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
								"parts": []any{
									"api",
									"check",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"getAll",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"getlast",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Ep",
						"type": "`$INTEGER`",
						"short": "Episode count if found",
					},
					map[string]any{
						"name": "exist",
						"title": "Exist",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether anime exists",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Anime ID if found",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/find/{name}",
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
								"parts": []any{
									"api",
									"find",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "One Piece",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"findby_genre": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "currentPage",
						"title": "Current Page",
						"type": "`$INTEGER`",
						"short": "Current page number",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wholePage",
						"title": "Whole Page",
						"type": "`$ARRAY`",
						"short": "Array of anime on current page",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "findby_genre",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"findbyGenre",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"genre": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "genre",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "harem",
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
									},
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
						"title": "Characters",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jikan",
						"title": "Jikan",
						"type": "`$OBJECT`",
						"short": "MyAnimeList data from Jikan API",
					},
					map[string]any{
						"name": "local",
						"title": "Local",
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
								"parts": []any{
									"anime",
									"api",
									"details",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 119,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Aired",
						"type": "`$STRING`",
						"short": "Air date range",
					},
					map[string]any{
						"name": "Cover",
						"title": "Cover",
						"type": "`$STRING`",
						"short": "Cover image path or URL.",
					},
					map[string]any{
						"name": "DescripTion",
						"title": "Descrip Tion",
						"type": "`$STRING`",
						"short": "Anime description",
					},
					map[string]any{
						"name": "Duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Episode duration",
					},
					map[string]any{
						"name": "Genres",
						"title": "Genres",
						"type": "`$ARRAY`",
						"short": "List of genres",
					},
					map[string]any{
						"name": "ImagePath",
						"title": "Image Path",
						"type": "`$STRING`",
						"short": "Image path or URL.",
					},
					map[string]any{
						"name": "MALScore",
						"title": "Mal Score",
						"type": "`$STRING`",
						"short": "MyAnimeList score",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Anime name",
					},
					map[string]any{
						"name": "Premiered",
						"title": "Premiered",
						"type": "`$STRING`",
						"short": "Premiere season",
					},
					map[string]any{
						"name": "RatingsNum",
						"title": "Ratings Num",
						"type": "`$INTEGER`",
						"short": "Number of ratings",
					},
					map[string]any{
						"name": "Status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Airing status",
					},
					map[string]any{
						"name": "Studios",
						"title": "Studios",
						"type": "`$STRING`",
						"short": "Production studio",
					},
					map[string]any{
						"name": "Synonyms",
						"title": "Synonyms",
						"type": "`$STRING`",
						"short": "Alternative names",
					},
					map[string]any{
						"name": "epCount",
						"title": "Ep Count",
						"type": "`$INTEGER`",
						"short": "Episode count",
					},
					map[string]any{
						"name": "finder",
						"title": "Finder",
						"type": "`$STRING`",
						"short": "Slug identifier",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Anime ID",
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
								"parts": []any{
									"api",
									"info",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "black-clover",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rating": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"title": "Aired",
						"type": "`$STRING`",
						"short": "Air date range",
					},
					map[string]any{
						"name": "Cover",
						"title": "Cover",
						"type": "`$STRING`",
						"short": "Cover image path or URL.",
					},
					map[string]any{
						"name": "DescripTion",
						"title": "Descrip Tion",
						"type": "`$STRING`",
						"short": "Anime description",
					},
					map[string]any{
						"name": "Duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Episode duration",
					},
					map[string]any{
						"name": "Genres",
						"title": "Genres",
						"type": "`$ARRAY`",
						"short": "List of genres",
					},
					map[string]any{
						"name": "ImagePath",
						"title": "Image Path",
						"type": "`$STRING`",
						"short": "Image path or URL.",
					},
					map[string]any{
						"name": "MALScore",
						"title": "Mal Score",
						"type": "`$STRING`",
						"short": "MyAnimeList score",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Anime name",
					},
					map[string]any{
						"name": "Premiered",
						"title": "Premiered",
						"type": "`$STRING`",
						"short": "Premiere season",
					},
					map[string]any{
						"name": "RatingsNum",
						"title": "Ratings Num",
						"type": "`$INTEGER`",
						"short": "Number of ratings",
					},
					map[string]any{
						"name": "Status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Airing status",
					},
					map[string]any{
						"name": "Studios",
						"title": "Studios",
						"type": "`$STRING`",
						"short": "Production studio",
					},
					map[string]any{
						"name": "Synonyms",
						"title": "Synonyms",
						"type": "`$STRING`",
						"short": "Alternative names",
					},
					map[string]any{
						"name": "epCount",
						"title": "Ep Count",
						"type": "`$INTEGER`",
						"short": "Episode count",
					},
					map[string]any{
						"name": "finder",
						"title": "Finder",
						"type": "`$STRING`",
						"short": "Slug identifier",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Anime ID",
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
								"parts": []any{
									"api",
									"findbyrating",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.AniData`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
									},
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
						"title": "Aired",
						"type": "`$STRING`",
						"short": "Air date range",
					},
					map[string]any{
						"name": "Cover",
						"title": "Cover",
						"type": "`$STRING`",
						"short": "Cover image path or URL.",
					},
					map[string]any{
						"name": "DescripTion",
						"title": "Descrip Tion",
						"type": "`$STRING`",
						"short": "Anime description",
					},
					map[string]any{
						"name": "Duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Episode duration",
					},
					map[string]any{
						"name": "Genres",
						"title": "Genres",
						"type": "`$ARRAY`",
						"short": "List of genres",
					},
					map[string]any{
						"name": "ImagePath",
						"title": "Image Path",
						"type": "`$STRING`",
						"short": "Image path or URL.",
					},
					map[string]any{
						"name": "MALScore",
						"title": "Mal Score",
						"type": "`$STRING`",
						"short": "MyAnimeList score",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Anime name",
					},
					map[string]any{
						"name": "Premiered",
						"title": "Premiered",
						"type": "`$STRING`",
						"short": "Premiere season",
					},
					map[string]any{
						"name": "RatingsNum",
						"title": "Ratings Num",
						"type": "`$INTEGER`",
						"short": "Number of ratings",
					},
					map[string]any{
						"name": "Status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Airing status",
					},
					map[string]any{
						"name": "Studios",
						"title": "Studios",
						"type": "`$STRING`",
						"short": "Production studio",
					},
					map[string]any{
						"name": "Synonyms",
						"title": "Synonyms",
						"type": "`$STRING`",
						"short": "Alternative names",
					},
					map[string]any{
						"name": "epCount",
						"title": "Ep Count",
						"type": "`$INTEGER`",
						"short": "Episode count",
					},
					map[string]any{
						"name": "finder",
						"title": "Finder",
						"type": "`$STRING`",
						"short": "Slug identifier",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Anime ID",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/search/{name}",
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
								"parts": []any{
									"api",
									"search",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"searchall": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "currentPage",
						"title": "Current Page",
						"type": "`$INTEGER`",
						"short": "Current page number",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wholePage",
						"title": "Whole Page",
						"type": "`$ARRAY`",
						"short": "Array of anime on current page",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "searchall",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"searchall",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"name": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sort": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Aired",
						"title": "Aired",
						"type": "`$STRING`",
						"short": "Air date range",
					},
					map[string]any{
						"name": "Cover",
						"title": "Cover",
						"type": "`$STRING`",
						"short": "Cover image path or URL.",
					},
					map[string]any{
						"name": "DescripTion",
						"title": "Descrip Tion",
						"type": "`$STRING`",
						"short": "Anime description",
					},
					map[string]any{
						"name": "Duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Episode duration",
					},
					map[string]any{
						"name": "Genres",
						"title": "Genres",
						"type": "`$ARRAY`",
						"short": "List of genres",
					},
					map[string]any{
						"name": "ImagePath",
						"title": "Image Path",
						"type": "`$STRING`",
						"short": "Image path or URL.",
					},
					map[string]any{
						"name": "MALScore",
						"title": "Mal Score",
						"type": "`$STRING`",
						"short": "MyAnimeList score",
					},
					map[string]any{
						"name": "Name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Anime name",
					},
					map[string]any{
						"name": "Premiered",
						"title": "Premiered",
						"type": "`$STRING`",
						"short": "Premiere season",
					},
					map[string]any{
						"name": "RatingsNum",
						"title": "Ratings Num",
						"type": "`$INTEGER`",
						"short": "Number of ratings",
					},
					map[string]any{
						"name": "Status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Airing status",
					},
					map[string]any{
						"name": "Studios",
						"title": "Studios",
						"type": "`$STRING`",
						"short": "Production studio",
					},
					map[string]any{
						"name": "Synonyms",
						"title": "Synonyms",
						"type": "`$STRING`",
						"short": "Alternative names",
					},
					map[string]any{
						"name": "epCount",
						"title": "Ep Count",
						"type": "`$INTEGER`",
						"short": "Episode count",
					},
					map[string]any{
						"name": "finder",
						"title": "Finder",
						"type": "`$STRING`",
						"short": "Slug identifier",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Anime ID",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "sort",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"sort",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.wholePage`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "genre",
											"orig": "genre",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Action",
										},
										map[string]any{
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
											"kind": "query",
											"example": "One Piece",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "ratefrom",
											"orig": "ratefrom",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "rateto",
											"orig": "rateto",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 10,
										},
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
						"title": "Ep",
						"type": "`$ARRAY`",
						"short": "Episodes 2+ streaming links",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"short": "Episode 1 streaming link with src= prefix",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Anime name",
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
								"parts": []any{
									"v1",
									"api",
									"details",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.local`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 119,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
