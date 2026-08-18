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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
								"parts": []any{
									"api",
									"check",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"api",
									"getAll",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/getlast",
								"parts": []any{
									"api",
									"getlast",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "exist",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "jikan",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "local",
						"type": "`$OBJECT`",
					},
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
								"parts": []any{
									"anime",
									"api",
									"details",
									"{id}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"api",
									"info",
									"{id}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currentPage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "epCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "wholePage",
						"type": "`$ARRAY`",
					},
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
								"parts": []any{
									"api",
									"sort",
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
								"parts": []any{
									"api",
									"findbyGenre",
									"{genre}",
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
								"parts": []any{
									"api",
									"searchall",
									"{name}",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"api",
									"findbyrating",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Cover",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "DescripTion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ImagePath",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "MALScore",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Premiered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "RatingsNum",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Studios",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "Synonyms",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "epCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "finder",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"v1",
									"api",
									"details",
									"{id}",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
