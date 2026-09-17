# Anipub Lua SDK



The Lua SDK for the Anipub API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Anime()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/anipub-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("anipub_sdk")

local client = sdk.new()
```

### 3. Load a paginatedanimelist

PaginatedAnimeList is nested under genre, so provide the `genre`.

```lua
local paginatedanimelist, err = client:PaginatedAnimeList():load({ genre = "example_genre" })
if err then error(err) end
print(paginatedanimelist)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Anime():create({ Genre = "example_Genre", Name = "example_Name" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local ratings, err = client:Rating():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Rating():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ANIPUB_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### AnipubSDK

```lua
local sdk = require("anipub_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AnipubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Anime` | `(data) -> AnimeEntity` | Create an Anime entity instance. |
| `Find` | `(data) -> FindEntity` | Create a Find entity instance. |
| `FullAnimeDetail` | `(data) -> FullAnimeDetailEntity` | Create a FullAnimeDetail entity instance. |
| `Info` | `(data) -> InfoEntity` | Create an Info entity instance. |
| `PaginatedAnimeList` | `(data) -> PaginatedAnimeListEntity` | Create a PaginatedAnimeList entity instance. |
| `Rating` | `(data) -> RatingEntity` | Create a Rating entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `StreamingDetail` | `(data) -> StreamingDetailEntity` | Create a StreamingDetail entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local anime, err = client:Anime():load()
    if err then error(err) end
    -- anime is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Anime

| Field | Description |
| --- | --- |
| `Genre` | Genre as string or array of strings |
| `Name` | Anime name to match |
| `exists` |  |

Operations: Create, Load.

API path: `/api/check`

#### Find

| Field | Description |
| --- | --- |
| `ep` | Episode count if found |
| `exist` | Whether anime exists |
| `id` | Anime ID if found |

Operations: Load.

API path: `/api/find/{name}`

#### FullAnimeDetail

| Field | Description |
| --- | --- |
| `characters` |  |
| `id` |  |
| `jikan` | MyAnimeList data from Jikan API |
| `local` |  |

Operations: Load.

API path: `/anime/api/details/{id}`

#### Info

| Field | Description |
| --- | --- |
| `Aired` | Air date range |
| `Cover` | Cover image path or URL. |
| `DescripTion` | Anime description |
| `Duration` | Episode duration |
| `Genres` | List of genres |
| `ImagePath` | Image path or URL. |
| `MALScore` | MyAnimeList score |
| `Name` | Anime name |
| `Premiered` | Premiere season |
| `RatingsNum` | Number of ratings |
| `Status` | Airing status |
| `Studios` | Production studio |
| `Synonyms` | Alternative names |
| `epCount` | Episode count |
| `finder` | Slug identifier |
| `id` | Anime ID |

Operations: Load.

API path: `/api/info/{id}`

#### PaginatedAnimeList

| Field | Description |
| --- | --- |
| `Aired` | Air date range |
| `Cover` | Cover image path or URL. |
| `DescripTion` | Anime description |
| `Duration` | Episode duration |
| `Genres` | List of genres |
| `ImagePath` | Image path or URL. |
| `MALScore` | MyAnimeList score |
| `Name` | Anime name |
| `Premiered` | Premiere season |
| `RatingsNum` | Number of ratings |
| `Status` | Airing status |
| `Studios` | Production studio |
| `Synonyms` | Alternative names |
| `currentPage` | Current page number |
| `epCount` | Episode count |
| `finder` | Slug identifier |
| `id` | Anime ID |
| `wholePage` | Array of anime on current page |

Operations: List, Load.

API path: `/api/sort`

#### Rating

| Field | Description |
| --- | --- |
| `Aired` | Air date range |
| `Cover` | Cover image path or URL. |
| `DescripTion` | Anime description |
| `Duration` | Episode duration |
| `Genres` | List of genres |
| `ImagePath` | Image path or URL. |
| `MALScore` | MyAnimeList score |
| `Name` | Anime name |
| `Premiered` | Premiere season |
| `RatingsNum` | Number of ratings |
| `Status` | Airing status |
| `Studios` | Production studio |
| `Synonyms` | Alternative names |
| `epCount` | Episode count |
| `finder` | Slug identifier |
| `id` | Anime ID |

Operations: List.

API path: `/api/findbyrating`

#### Search

| Field | Description |
| --- | --- |
| `Aired` | Air date range |
| `Cover` | Cover image path or URL. |
| `DescripTion` | Anime description |
| `Duration` | Episode duration |
| `Genres` | List of genres |
| `ImagePath` | Image path or URL. |
| `MALScore` | MyAnimeList score |
| `Name` | Anime name |
| `Premiered` | Premiere season |
| `RatingsNum` | Number of ratings |
| `Status` | Airing status |
| `Studios` | Production studio |
| `Synonyms` | Alternative names |
| `epCount` | Episode count |
| `finder` | Slug identifier |
| `id` | Anime ID |

Operations: Load.

API path: `/api/search/{name}`

#### StreamingDetail

| Field | Description |
| --- | --- |
| `ep` | Episodes 2+ streaming links |
| `id` |  |
| `link` | Episode 1 streaming link with src= prefix |
| `name` | Anime name |

Operations: Load.

API path: `/v1/api/details/{id}`



## Entities


### Anime

Create an instance: `local anime = client:Anime(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Genre` | `any` | Genre as string or array of strings |
| `Name` | `string` | Anime name to match |
| `exists` | `boolean` |  |

#### Example: Load

```lua
local anime, err = client:Anime():load()
```

#### Example: Create

```lua
local anime, err = client:Anime():create({
  Genre = "example_Genre", -- any
  Name = "example_Name", -- string
})
```


### Find

Create an instance: `local find = client:Find(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `number` | Episode count if found |
| `exist` | `boolean` | Whether anime exists |
| `id` | `number` | Anime ID if found |

#### Example: Load

```lua
local find, err = client:Find():load({ id = "find_id" })
```


### FullAnimeDetail

Create an instance: `local full_anime_detail = client:FullAnimeDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `table` |  |
| `id` | `string` |  |
| `jikan` | `table` | MyAnimeList data from Jikan API |
| `local` | `table` |  |

#### Example: Load

```lua
local full_anime_detail, err = client:FullAnimeDetail():load({ id = 1 })
```


### Info

Create an instance: `local info = client:Info(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `string` | Air date range |
| `Cover` | `string` | Cover image path or URL. |
| `DescripTion` | `string` | Anime description |
| `Duration` | `string` | Episode duration |
| `Genres` | `table` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `number` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `number` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `number` | Anime ID |

#### Example: Load

```lua
local info, err = client:Info():load({ id = "info_id" })
```


### PaginatedAnimeList

Create an instance: `local paginated_anime_list = client:PaginatedAnimeList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `string` | Air date range |
| `Cover` | `string` | Cover image path or URL. |
| `DescripTion` | `string` | Anime description |
| `Duration` | `string` | Episode duration |
| `Genres` | `table` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `number` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `currentPage` | `number` | Current page number |
| `epCount` | `number` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `number` | Anime ID |
| `wholePage` | `table` | Array of anime on current page |

#### Example: Load

```lua
local paginated_anime_list, err = client:PaginatedAnimeList():load({ genre = "genre" })
```

#### Example: List

```lua
local paginated_anime_lists, err = client:PaginatedAnimeList():list()
```


### Rating

Create an instance: `local rating = client:Rating(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `string` | Air date range |
| `Cover` | `string` | Cover image path or URL. |
| `DescripTion` | `string` | Anime description |
| `Duration` | `string` | Episode duration |
| `Genres` | `table` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `number` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `number` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `number` | Anime ID |

#### Example: List

```lua
local ratings, err = client:Rating():list()
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `string` | Air date range |
| `Cover` | `string` | Cover image path or URL. |
| `DescripTion` | `string` | Anime description |
| `Duration` | `string` | Episode duration |
| `Genres` | `table` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `number` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `number` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `number` | Anime ID |

#### Example: Load

```lua
local search, err = client:Search():load({ id = "search_id" })
```


### StreamingDetail

Create an instance: `local streaming_detail = client:StreamingDetail(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `table` | Episodes 2+ streaming links |
| `id` | `string` |  |
| `link` | `string` | Episode 1 streaming link with src= prefix |
| `name` | `string` | Anime name |

#### Example: Load

```lua
local streaming_detail, err = client:StreamingDetail():load({ id = 1 })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── anipub_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`anipub_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local rating = client:Rating()
rating:list()

-- rating:data_get() now returns the rating data from the last list
-- rating:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
