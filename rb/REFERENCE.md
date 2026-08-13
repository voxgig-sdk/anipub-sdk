# Anipub Ruby SDK Reference

Complete API reference for the Anipub Ruby SDK.


## AnipubSDK

### Constructor

```ruby
require_relative 'Anipub_sdk'

client = AnipubSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AnipubSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AnipubSDK.test
```


### Instance Methods

#### `Anime(data = nil)`

Create a new `Anime` entity instance. Pass `nil` for no initial data.

#### `Find(data = nil)`

Create a new `Find` entity instance. Pass `nil` for no initial data.

#### `FullAnimeDetail(data = nil)`

Create a new `FullAnimeDetail` entity instance. Pass `nil` for no initial data.

#### `Info(data = nil)`

Create a new `Info` entity instance. Pass `nil` for no initial data.

#### `PaginatedAnimeList(data = nil)`

Create a new `PaginatedAnimeList` entity instance. Pass `nil` for no initial data.

#### `Rating(data = nil)`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `StreamingDetail(data = nil)`

Create a new `StreamingDetail` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AnimeEntity

```ruby
anime = client.Anime
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Genre` | `Object` | Yes |  |
| `Name` | `String` | Yes |  |
| `exists` | `Boolean` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Anime.create({
  "Genre" => "example_Genre", # Object
  "Name" => "example_Name", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Anime.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AnimeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FindEntity

```ruby
find = client.Find
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `Integer` | No |  |
| `exist` | `Boolean` | Yes |  |
| `id` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Find.load({ "id" => "find_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FindEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FullAnimeDetailEntity

```ruby
full_anime_detail = client.FullAnimeDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `Array` | No |  |
| `jikan` | `Hash` | No |  |
| `local` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FullAnimeDetail.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FullAnimeDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InfoEntity

```ruby
info = client.Info
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `String` | No |  |
| `Cover` | `String` | No |  |
| `DescripTion` | `String` | No |  |
| `Duration` | `String` | No |  |
| `Genres` | `Array` | No |  |
| `ImagePath` | `String` | No |  |
| `MALScore` | `String` | No |  |
| `Name` | `String` | No |  |
| `Premiered` | `String` | No |  |
| `RatingsNum` | `Integer` | No |  |
| `Status` | `String` | No |  |
| `Studios` | `String` | No |  |
| `Synonyms` | `String` | No |  |
| `epCount` | `Integer` | No |  |
| `finder` | `String` | No |  |
| `id` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Info.load({ "id" => "info_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InfoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaginatedAnimeListEntity

```ruby
paginated_anime_list = client.PaginatedAnimeList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `String` | No |  |
| `Cover` | `String` | No |  |
| `DescripTion` | `String` | No |  |
| `Duration` | `String` | No |  |
| `Genres` | `Array` | No |  |
| `ImagePath` | `String` | No |  |
| `MALScore` | `String` | No |  |
| `Name` | `String` | No |  |
| `Premiered` | `String` | No |  |
| `RatingsNum` | `Integer` | No |  |
| `Status` | `String` | No |  |
| `Studios` | `String` | No |  |
| `Synonyms` | `String` | No |  |
| `currentPage` | `Integer` | No |  |
| `epCount` | `Integer` | No |  |
| `finder` | `String` | No |  |
| `id` | `Integer` | No |  |
| `wholePage` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PaginatedAnimeList.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PaginatedAnimeList.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaginatedAnimeListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RatingEntity

```ruby
rating = client.Rating
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `String` | No |  |
| `Cover` | `String` | No |  |
| `DescripTion` | `String` | No |  |
| `Duration` | `String` | No |  |
| `Genres` | `Array` | No |  |
| `ImagePath` | `String` | No |  |
| `MALScore` | `String` | No |  |
| `Name` | `String` | No |  |
| `Premiered` | `String` | No |  |
| `RatingsNum` | `Integer` | No |  |
| `Status` | `String` | No |  |
| `Studios` | `String` | No |  |
| `Synonyms` | `String` | No |  |
| `epCount` | `Integer` | No |  |
| `finder` | `String` | No |  |
| `id` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Rating.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `String` | No |  |
| `Cover` | `String` | No |  |
| `DescripTion` | `String` | No |  |
| `Duration` | `String` | No |  |
| `Genres` | `Array` | No |  |
| `ImagePath` | `String` | No |  |
| `MALScore` | `String` | No |  |
| `Name` | `String` | No |  |
| `Premiered` | `String` | No |  |
| `RatingsNum` | `Integer` | No |  |
| `Status` | `String` | No |  |
| `Studios` | `String` | No |  |
| `Synonyms` | `String` | No |  |
| `epCount` | `Integer` | No |  |
| `finder` | `String` | No |  |
| `id` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Search.load({ "id" => "search_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StreamingDetailEntity

```ruby
streaming_detail = client.StreamingDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `Array` | No |  |
| `link` | `String` | No |  |
| `name` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.StreamingDetail.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StreamingDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = AnipubSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

