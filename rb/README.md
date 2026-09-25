# Anipub Ruby SDK



The Ruby SDK for the Anipub API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Anime` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/anipub-sdk/releases](https://github.com/voxgig-sdk/anipub-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Anipub_sdk"

client = AnipubSDK.new
```

### 3. Load an anime

```ruby
begin
  # load returns the ENTITY — call data_get for the Anime record (raises on error).
  anime = client.Anime.load()
  puts anime
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Anime record.
created = client.Anime.create({ "Genre" => "example_Genre", "Name" => "example_Name" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  anime = client.Anime.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = AnipubSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
anime = client.Anime.load()
puts anime
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AnipubSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AnipubSDK

```ruby
require_relative "Anipub_sdk"
client = AnipubSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AnipubSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AnipubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Anime` | `(data) -> AnimeEntity` | Create an Anime entity instance. |
| `Find` | `(data) -> FindEntity` | Create a Find entity instance. |
| `FindbyGenre` | `(data) -> FindbyGenreEntity` | Create a FindbyGenre entity instance. |
| `FullAnimeDetail` | `(data) -> FullAnimeDetailEntity` | Create a FullAnimeDetail entity instance. |
| `Info` | `(data) -> InfoEntity` | Create an Info entity instance. |
| `Rating` | `(data) -> RatingEntity` | Create a Rating entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Searchall` | `(data) -> SearchallEntity` | Create a Searchall entity instance. |
| `Sort` | `(data) -> SortEntity` | Create a Sort entity instance. |
| `StreamingDetail` | `(data) -> StreamingDetailEntity` | Create a StreamingDetail entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `AnipubError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

#### FindbyGenre

| Field | Description |
| --- | --- |
| `currentPage` | Current page number |
| `id` |  |
| `wholePage` | Array of anime on current page |

Operations: Load.

API path: `/api/findbyGenre/{genre}`

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

#### Searchall

| Field | Description |
| --- | --- |
| `currentPage` | Current page number |
| `id` |  |
| `wholePage` | Array of anime on current page |

Operations: Load.

API path: `/api/searchall/{name}`

#### Sort

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

API path: `/api/sort`

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

Create an instance: `anime = client.Anime`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Genre` | `Object` | Genre as string or array of strings |
| `Name` | `String` | Anime name to match |
| `exists` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Anime record (raises on error).
anime = client.Anime.load()
```

#### Example: Create

```ruby
anime = client.Anime.create({
  "Genre" => "example_Genre", # Object
  "Name" => "example_Name", # String
})
```


### Find

Create an instance: `find = client.Find`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `Integer` | Episode count if found |
| `exist` | `Boolean` | Whether anime exists |
| `id` | `Integer` | Anime ID if found |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Find record (raises on error).
find = client.Find.load({ "id" => "find_id" })
```


### FindbyGenre

Create an instance: `findby_genre = client.FindbyGenre`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currentPage` | `Integer` | Current page number |
| `id` | `String` |  |
| `wholePage` | `Array` | Array of anime on current page |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FindbyGenre record (raises on error).
findby_genre = client.FindbyGenre.load({ "id" => "findby_genre_id" })
```


### FullAnimeDetail

Create an instance: `full_anime_detail = client.FullAnimeDetail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `Array` |  |
| `id` | `String` |  |
| `jikan` | `Hash` | MyAnimeList data from Jikan API |
| `local` | `Hash` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FullAnimeDetail record (raises on error).
full_anime_detail = client.FullAnimeDetail.load({ "id" => 1 })
```


### Info

Create an instance: `info = client.Info`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `String` | Air date range |
| `Cover` | `String` | Cover image path or URL. |
| `DescripTion` | `String` | Anime description |
| `Duration` | `String` | Episode duration |
| `Genres` | `Array` | List of genres |
| `ImagePath` | `String` | Image path or URL. |
| `MALScore` | `String` | MyAnimeList score |
| `Name` | `String` | Anime name |
| `Premiered` | `String` | Premiere season |
| `RatingsNum` | `Integer` | Number of ratings |
| `Status` | `String` | Airing status |
| `Studios` | `String` | Production studio |
| `Synonyms` | `String` | Alternative names |
| `epCount` | `Integer` | Episode count |
| `finder` | `String` | Slug identifier |
| `id` | `Integer` | Anime ID |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Info record (raises on error).
info = client.Info.load({ "id" => "info_id" })
```


### Rating

Create an instance: `rating = client.Rating`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `String` | Air date range |
| `Cover` | `String` | Cover image path or URL. |
| `DescripTion` | `String` | Anime description |
| `Duration` | `String` | Episode duration |
| `Genres` | `Array` | List of genres |
| `ImagePath` | `String` | Image path or URL. |
| `MALScore` | `String` | MyAnimeList score |
| `Name` | `String` | Anime name |
| `Premiered` | `String` | Premiere season |
| `RatingsNum` | `Integer` | Number of ratings |
| `Status` | `String` | Airing status |
| `Studios` | `String` | Production studio |
| `Synonyms` | `String` | Alternative names |
| `epCount` | `Integer` | Episode count |
| `finder` | `String` | Slug identifier |
| `id` | `Integer` | Anime ID |

#### Example: List

```ruby
# list returns an Array of Rating records (raises on error).
ratings = client.Rating.list
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `String` | Air date range |
| `Cover` | `String` | Cover image path or URL. |
| `DescripTion` | `String` | Anime description |
| `Duration` | `String` | Episode duration |
| `Genres` | `Array` | List of genres |
| `ImagePath` | `String` | Image path or URL. |
| `MALScore` | `String` | MyAnimeList score |
| `Name` | `String` | Anime name |
| `Premiered` | `String` | Premiere season |
| `RatingsNum` | `Integer` | Number of ratings |
| `Status` | `String` | Airing status |
| `Studios` | `String` | Production studio |
| `Synonyms` | `String` | Alternative names |
| `epCount` | `Integer` | Episode count |
| `finder` | `String` | Slug identifier |
| `id` | `Integer` | Anime ID |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Search record (raises on error).
search = client.Search.load({ "id" => "search_id" })
```


### Searchall

Create an instance: `searchall = client.Searchall`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `currentPage` | `Integer` | Current page number |
| `id` | `String` |  |
| `wholePage` | `Array` | Array of anime on current page |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Searchall record (raises on error).
searchall = client.Searchall.load({ "id" => "searchall_id" })
```


### Sort

Create an instance: `sort = client.Sort`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Aired` | `String` | Air date range |
| `Cover` | `String` | Cover image path or URL. |
| `DescripTion` | `String` | Anime description |
| `Duration` | `String` | Episode duration |
| `Genres` | `Array` | List of genres |
| `ImagePath` | `String` | Image path or URL. |
| `MALScore` | `String` | MyAnimeList score |
| `Name` | `String` | Anime name |
| `Premiered` | `String` | Premiere season |
| `RatingsNum` | `Integer` | Number of ratings |
| `Status` | `String` | Airing status |
| `Studios` | `String` | Production studio |
| `Synonyms` | `String` | Alternative names |
| `epCount` | `Integer` | Episode count |
| `finder` | `String` | Slug identifier |
| `id` | `Integer` | Anime ID |

#### Example: List

```ruby
# list returns an Array of Sort records (raises on error).
sorts = client.Sort.list
```


### StreamingDetail

Create an instance: `streaming_detail = client.StreamingDetail`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `Array` | Episodes 2+ streaming links |
| `id` | `String` |  |
| `link` | `String` | Episode 1 streaming link with src= prefix |
| `name` | `String` | Anime name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the StreamingDetail record (raises on error).
streaming_detail = client.StreamingDetail.load({ "id" => 1 })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

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

Retry.

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

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Anipub_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Anipub_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
anime = client.Anime
anime.load()

# anime.data_get now returns the anime data from the last load
# anime.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
