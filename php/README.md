# Anipub PHP SDK



The PHP SDK for the Anipub API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Anime()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/anipub-sdk/releases](https://github.com/voxgig-sdk/anipub-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'anipub_sdk.php';

$client = new AnipubSDK();
```

### 3. Load a paginatedanimelist

PaginatedAnimeList is nested under genre, so provide the `genre`.

```php
try {
    // load() returns the ENTITY — call data_get() for the PaginatedAnimeList record (throws on error).
    $paginatedanimelist = $client->PaginatedAnimeList()->load(["genre" => "example_genre"]);
    print_r($paginatedanimelist->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Anime record.
$created = $client->Anime()->create(["Genre" => "example_Genre", "Name" => "example_Name"]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $ratings = $client->Rating()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = AnipubSDK::test([
    "entity" => ["find" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$find = $client->Find()->load(["id" => "test01"]);
print_r($find->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new AnipubSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ANIPUB_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### AnipubSDK

```php
require_once 'anipub_sdk.php';
$client = new AnipubSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = AnipubSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### AnipubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Anime` | `($data): AnimeEntity` | Create an Anime entity instance. |
| `Find` | `($data): FindEntity` | Create a Find entity instance. |
| `FullAnimeDetail` | `($data): FullAnimeDetailEntity` | Create a FullAnimeDetail entity instance. |
| `Info` | `($data): InfoEntity` | Create an Info entity instance. |
| `PaginatedAnimeList` | `($data): PaginatedAnimeListEntity` | Create a PaginatedAnimeList entity instance. |
| `Rating` | `($data): RatingEntity` | Create a Rating entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `StreamingDetail` | `($data): StreamingDetailEntity` | Create a StreamingDetail entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$anime = $client->Anime();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `Genre` | `mixed` | Genre as string or array of strings |
| `Name` | `string` | Anime name to match |
| `exists` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Anime record (throws on error).
$anime = $client->Anime()->load();
```

#### Example: Create

```php
$anime = $client->Anime()->create([
    "Genre" => null, // mixed
    "Name" => null, // string
]);
```


### Find

Create an instance: `$find = $client->Find();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `int` | Episode count if found |
| `exist` | `bool` | Whether anime exists |
| `id` | `int` | Anime ID if found |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Find record (throws on error).
$find = $client->Find()->load(["id" => "find_id"]);
```


### FullAnimeDetail

Create an instance: `$full_anime_detail = $client->FullAnimeDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `array` |  |
| `id` | `string` |  |
| `jikan` | `array` | MyAnimeList data from Jikan API |
| `local` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the FullAnimeDetail record (throws on error).
$full_anime_detail = $client->FullAnimeDetail()->load(["id" => 1]);
```


### Info

Create an instance: `$info = $client->Info();`

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
| `Genres` | `array` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `int` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `int` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `int` | Anime ID |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Info record (throws on error).
$info = $client->Info()->load(["id" => "info_id"]);
```


### PaginatedAnimeList

Create an instance: `$paginated_anime_list = $client->PaginatedAnimeList();`

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
| `Genres` | `array` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `int` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `currentPage` | `int` | Current page number |
| `epCount` | `int` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `int` | Anime ID |
| `wholePage` | `array` | Array of anime on current page |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PaginatedAnimeList record (throws on error).
$paginated_anime_list = $client->PaginatedAnimeList()->load(["genre" => "genre"]);
```

#### Example: List

```php
// list() returns an array of PaginatedAnimeList records (throws on error).
$paginated_anime_lists = $client->PaginatedAnimeList()->list();
```


### Rating

Create an instance: `$rating = $client->Rating();`

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
| `Genres` | `array` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `int` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `int` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `int` | Anime ID |

#### Example: List

```php
// list() returns an array of Rating records (throws on error).
$ratings = $client->Rating()->list();
```


### Search

Create an instance: `$search = $client->Search();`

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
| `Genres` | `array` | List of genres |
| `ImagePath` | `string` | Image path or URL. |
| `MALScore` | `string` | MyAnimeList score |
| `Name` | `string` | Anime name |
| `Premiered` | `string` | Premiere season |
| `RatingsNum` | `int` | Number of ratings |
| `Status` | `string` | Airing status |
| `Studios` | `string` | Production studio |
| `Synonyms` | `string` | Alternative names |
| `epCount` | `int` | Episode count |
| `finder` | `string` | Slug identifier |
| `id` | `int` | Anime ID |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Search record (throws on error).
$search = $client->Search()->load(["id" => "search_id"]);
```


### StreamingDetail

Create an instance: `$streaming_detail = $client->StreamingDetail();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `array` | Episodes 2+ streaming links |
| `id` | `string` |  |
| `link` | `string` | Episode 1 streaming link with src= prefix |
| `name` | `string` | Anime name |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StreamingDetail record (throws on error).
$streaming_detail = $client->StreamingDetail()->load(["id" => 1]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── anipub_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`anipub_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$rating = $client->Rating();
$rating->list();

// $rating->data_get() now returns the rating data from the last list
// $rating->match_get() returns the last match criteria
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
