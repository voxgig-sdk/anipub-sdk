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
| `Genre` | `Object` | Yes | Genre as string or array of strings |
| `Name` | `String` | Yes | Anime name to match |
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
| `ep` | `Integer` | No | Episode count if found |
| `exist` | `Boolean` | Yes | Whether anime exists |
| `id` | `Integer` | No | Anime ID if found |

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
| `id` | `String` | No |  |
| `jikan` | `Hash` | No | MyAnimeList data from Jikan API |
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
| `Aired` | `String` | No | Air date range |
| `Cover` | `String` | No | Cover image path or URL. |
| `DescripTion` | `String` | No | Anime description |
| `Duration` | `String` | No | Episode duration |
| `Genres` | `Array` | No | List of genres |
| `ImagePath` | `String` | No | Image path or URL. |
| `MALScore` | `String` | No | MyAnimeList score |
| `Name` | `String` | No | Anime name |
| `Premiered` | `String` | No | Premiere season |
| `RatingsNum` | `Integer` | No | Number of ratings |
| `Status` | `String` | No | Airing status |
| `Studios` | `String` | No | Production studio |
| `Synonyms` | `String` | No | Alternative names |
| `epCount` | `Integer` | No | Episode count |
| `finder` | `String` | No | Slug identifier |
| `id` | `Integer` | No | Anime ID |

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
| `Aired` | `String` | No | Air date range |
| `Cover` | `String` | No | Cover image path or URL. |
| `DescripTion` | `String` | No | Anime description |
| `Duration` | `String` | No | Episode duration |
| `Genres` | `Array` | No | List of genres |
| `ImagePath` | `String` | No | Image path or URL. |
| `MALScore` | `String` | No | MyAnimeList score |
| `Name` | `String` | No | Anime name |
| `Premiered` | `String` | No | Premiere season |
| `RatingsNum` | `Integer` | No | Number of ratings |
| `Status` | `String` | No | Airing status |
| `Studios` | `String` | No | Production studio |
| `Synonyms` | `String` | No | Alternative names |
| `currentPage` | `Integer` | No | Current page number |
| `epCount` | `Integer` | No | Episode count |
| `finder` | `String` | No | Slug identifier |
| `id` | `Integer` | No | Anime ID |
| `wholePage` | `Array` | No | Array of anime on current page |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PaginatedAnimeList.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PaginatedAnimeList.load({ "genre" => "genre" })
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
| `Aired` | `String` | No | Air date range |
| `Cover` | `String` | No | Cover image path or URL. |
| `DescripTion` | `String` | No | Anime description |
| `Duration` | `String` | No | Episode duration |
| `Genres` | `Array` | No | List of genres |
| `ImagePath` | `String` | No | Image path or URL. |
| `MALScore` | `String` | No | MyAnimeList score |
| `Name` | `String` | No | Anime name |
| `Premiered` | `String` | No | Premiere season |
| `RatingsNum` | `Integer` | No | Number of ratings |
| `Status` | `String` | No | Airing status |
| `Studios` | `String` | No | Production studio |
| `Synonyms` | `String` | No | Alternative names |
| `epCount` | `Integer` | No | Episode count |
| `finder` | `String` | No | Slug identifier |
| `id` | `Integer` | No | Anime ID |

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
| `Aired` | `String` | No | Air date range |
| `Cover` | `String` | No | Cover image path or URL. |
| `DescripTion` | `String` | No | Anime description |
| `Duration` | `String` | No | Episode duration |
| `Genres` | `Array` | No | List of genres |
| `ImagePath` | `String` | No | Image path or URL. |
| `MALScore` | `String` | No | MyAnimeList score |
| `Name` | `String` | No | Anime name |
| `Premiered` | `String` | No | Premiere season |
| `RatingsNum` | `Integer` | No | Number of ratings |
| `Status` | `String` | No | Airing status |
| `Studios` | `String` | No | Production studio |
| `Synonyms` | `String` | No | Alternative names |
| `epCount` | `Integer` | No | Episode count |
| `finder` | `String` | No | Slug identifier |
| `id` | `Integer` | No | Anime ID |

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
| `ep` | `Array` | No | Episodes 2+ streaming links |
| `id` | `String` | No |  |
| `link` | `String` | No | Episode 1 streaming link with src= prefix |
| `name` | `String` | No | Anime name |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ruby
client = AnipubSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

