# Anipub Lua SDK Reference

Complete API reference for the Anipub Lua SDK.


## AnipubSDK

### Constructor

```lua
local sdk = require("anipub_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Anime(data)`

Create a new `Anime` entity instance. Pass `nil` for no initial data.

#### `Find(data)`

Create a new `Find` entity instance. Pass `nil` for no initial data.

#### `FullAnimeDetail(data)`

Create a new `FullAnimeDetail` entity instance. Pass `nil` for no initial data.

#### `Info(data)`

Create a new `Info` entity instance. Pass `nil` for no initial data.

#### `PaginatedAnimeList(data)`

Create a new `PaginatedAnimeList` entity instance. Pass `nil` for no initial data.

#### `Rating(data)`

Create a new `Rating` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `StreamingDetail(data)`

Create a new `StreamingDetail` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AnimeEntity

```lua
local anime = client:Anime(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Genre` | `any` | Yes | Genre as string or array of strings |
| `Name` | `string` | Yes | Anime name to match |
| `exists` | `boolean` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Anime():create({
  Genre = --[[ any ]],
  Name = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Anime():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnimeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FindEntity

```lua
local find = client:Find(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `number` | No | Episode count if found |
| `exist` | `boolean` | Yes | Whether anime exists |
| `id` | `number` | No | Anime ID if found |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Find():load({ id = "find_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FindEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FullAnimeDetailEntity

```lua
local full_anime_detail = client:FullAnimeDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `table` | No |  |
| `id` | `string` | No |  |
| `jikan` | `table` | No | MyAnimeList data from Jikan API |
| `local` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FullAnimeDetail():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FullAnimeDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InfoEntity

```lua
local info = client:Info(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `table` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `number` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `number` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `number` | No | Anime ID |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Info():load({ id = "info_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InfoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaginatedAnimeListEntity

```lua
local paginated_anime_list = client:PaginatedAnimeList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `table` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `number` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `currentPage` | `number` | No | Current page number |
| `epCount` | `number` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `number` | No | Anime ID |
| `wholePage` | `table` | No | Array of anime on current page |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PaginatedAnimeList():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PaginatedAnimeList():load({ genre = "genre" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedAnimeListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RatingEntity

```lua
local rating = client:Rating(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `table` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `number` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `number` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `number` | No | Anime ID |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Rating():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `table` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `number` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `number` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `number` | No | Anime ID |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Search():load({ id = "search_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StreamingDetailEntity

```lua
local streaming_detail = client:StreamingDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `table` | No | Episodes 2+ streaming links |
| `id` | `string` | No |  |
| `link` | `string` | No | Episode 1 streaming link with src= prefix |
| `name` | `string` | No | Anime name |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:StreamingDetail():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StreamingDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

