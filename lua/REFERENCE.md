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
| `Genre` | `any` | Yes |  |
| `Name` | `string` | Yes |  |
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
| `ep` | `number` | No |  |
| `exist` | `boolean` | Yes |  |
| `id` | `number` | No |  |

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
| `jikan` | `table` | No |  |
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
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `table` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `number` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `number` | No |  |
| `finder` | `string` | No |  |
| `id` | `number` | No |  |

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
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `table` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `number` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `currentPage` | `number` | No |  |
| `epCount` | `number` | No |  |
| `finder` | `string` | No |  |
| `id` | `number` | No |  |
| `wholePage` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PaginatedAnimeList():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PaginatedAnimeList():load()
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
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `table` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `number` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `number` | No |  |
| `finder` | `string` | No |  |
| `id` | `number` | No |  |

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
| `Aired` | `string` | No |  |
| `Cover` | `string` | No |  |
| `DescripTion` | `string` | No |  |
| `Duration` | `string` | No |  |
| `Genres` | `table` | No |  |
| `ImagePath` | `string` | No |  |
| `MALScore` | `string` | No |  |
| `Name` | `string` | No |  |
| `Premiered` | `string` | No |  |
| `RatingsNum` | `number` | No |  |
| `Status` | `string` | No |  |
| `Studios` | `string` | No |  |
| `Synonyms` | `string` | No |  |
| `epCount` | `number` | No |  |
| `finder` | `string` | No |  |
| `id` | `number` | No |  |

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
| `ep` | `table` | No |  |
| `link` | `string` | No |  |
| `name` | `string` | No |  |

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

