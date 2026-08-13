# Anipub Golang SDK Reference

Complete API reference for the Anipub Golang SDK.


## AnipubSDK

### Constructor

```go
func NewAnipubSDK(options map[string]any) *AnipubSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *AnipubSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *AnipubSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Anime(data map[string]any) AnipubEntity`

Create a new `Anime` entity instance. Pass `nil` for no initial data.

#### `Find(data map[string]any) AnipubEntity`

Create a new `Find` entity instance. Pass `nil` for no initial data.

#### `FullAnimeDetail(data map[string]any) AnipubEntity`

Create a new `FullAnimeDetail` entity instance. Pass `nil` for no initial data.

#### `Info(data map[string]any) AnipubEntity`

Create a new `Info` entity instance. Pass `nil` for no initial data.

#### `PaginatedAnimeList(data map[string]any) AnipubEntity`

Create a new `PaginatedAnimeList` entity instance. Pass `nil` for no initial data.

#### `Rating(data map[string]any) AnipubEntity`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) AnipubEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `StreamingDetail(data map[string]any) AnipubEntity`

Create a new `StreamingDetail` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AnimeEntity

```go
anime := client.Anime(nil)
fmt.Println(anime.GetName()) // "anime"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Genre` | `any` | Yes |  |
| `Name` | `string` | Yes |  |
| `exists` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Anime(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Anime(nil).Create(map[string]any{
    "Genre": "example_Genre",
    "Name": "example_Name",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AnimeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FindEntity

```go
find := client.Find(nil)
fmt.Println(find.GetName()) // "find"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `int` | No |  |
| `exist` | `bool` | Yes |  |
| `id` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Find(nil).Load(map[string]any{"id": "find_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FindEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FullAnimeDetailEntity

```go
fullAnimeDetail := client.FullAnimeDetail(nil)
fmt.Println(fullAnimeDetail.GetName()) // "full_anime_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `[]any` | No |  |
| `jikan` | `map[string]any` | No |  |
| `local` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FullAnimeDetail(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FullAnimeDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InfoEntity

```go
info := client.Info(nil)
fmt.Println(info.GetName()) // "info"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `[]any` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `int` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `int` | No |  |
| `finder` | `string` | No |  |
| `id` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Info(nil).Load(map[string]any{"id": "info_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InfoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PaginatedAnimeListEntity

```go
paginatedAnimeList := client.PaginatedAnimeList(nil)
fmt.Println(paginatedAnimeList.GetName()) // "paginated_anime_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `[]any` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `int` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `currentPage` | `int` | No |  |
| `epCount` | `int` | No |  |
| `finder` | `string` | No |  |
| `id` | `int` | No |  |
| `wholePage` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PaginatedAnimeList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PaginatedAnimeList(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PaginatedAnimeListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RatingEntity

```go
rating := client.Rating(nil)
fmt.Println(rating.GetName()) // "rating"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `[]any` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `int` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `int` | No |  |
| `finder` | `string` | No |  |
| `id` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Rating(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `[]any` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `int` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `int` | No |  |
| `finder` | `string` | No |  |
| `id` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(map[string]any{"id": "search_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StreamingDetailEntity

```go
streamingDetail := client.StreamingDetail(nil)
fmt.Println(streamingDetail.GetName()) // "streaming_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `[]any` | No |  |
| `link` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.StreamingDetail(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StreamingDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewAnipubSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

