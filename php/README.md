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

### 3. Load an anime

```php
try {
    // load() returns the ENTITY — call data_get() for the Anime record (throws on error).
    $anime = $client->Anime()->load();
    print_r($anime);
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

Create a mock client for unit testing — no server required:

```php
$client = AnipubSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$rating = $client->Rating()->list();
print_r($rating);
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
| `Genre` |  |
| `Name` |  |
| `exists` |  |

Operations: Create, Load.

API path: `/api/check`

#### Find

| Field | Description |
| --- | --- |
| `ep` |  |
| `exist` |  |
| `id` |  |

Operations: Load.

API path: `/api/find/{name}`

#### FullAnimeDetail

| Field | Description |
| --- | --- |
| `characters` |  |
| `jikan` |  |
| `local` |  |

Operations: Load.

API path: `/anime/api/details/{id}`

#### Info

| Field | Description |
| --- | --- |
| `Aired` |  |
| `Cover` |  |
| `DescripTion` |  |
| `Duration` |  |
| `Genres` |  |
| `ImagePath` |  |
| `MALScore` |  |
| `Name` |  |
| `Premiered` |  |
| `RatingsNum` |  |
| `Status` |  |
| `Studios` |  |
| `Synonyms` |  |
| `epCount` |  |
| `finder` |  |
| `id` |  |

Operations: Load.

API path: `/api/info/{id}`

#### PaginatedAnimeList

| Field | Description |
| --- | --- |
| `Aired` |  |
| `Cover` |  |
| `DescripTion` |  |
| `Duration` |  |
| `Genres` |  |
| `ImagePath` |  |
| `MALScore` |  |
| `Name` |  |
| `Premiered` |  |
| `RatingsNum` |  |
| `Status` |  |
| `Studios` |  |
| `Synonyms` |  |
| `currentPage` |  |
| `epCount` |  |
| `finder` |  |
| `id` |  |
| `wholePage` |  |

Operations: List, Load.

API path: `/api/sort`

#### Rating

| Field | Description |
| --- | --- |
| `Aired` |  |
| `Cover` |  |
| `DescripTion` |  |
| `Duration` |  |
| `Genres` |  |
| `ImagePath` |  |
| `MALScore` |  |
| `Name` |  |
| `Premiered` |  |
| `RatingsNum` |  |
| `Status` |  |
| `Studios` |  |
| `Synonyms` |  |
| `epCount` |  |
| `finder` |  |
| `id` |  |

Operations: List.

API path: `/api/findbyrating`

#### Search

| Field | Description |
| --- | --- |
| `Aired` |  |
| `Cover` |  |
| `DescripTion` |  |
| `Duration` |  |
| `Genres` |  |
| `ImagePath` |  |
| `MALScore` |  |
| `Name` |  |
| `Premiered` |  |
| `RatingsNum` |  |
| `Status` |  |
| `Studios` |  |
| `Synonyms` |  |
| `epCount` |  |
| `finder` |  |
| `id` |  |

Operations: Load.

API path: `/api/search/{name}`

#### StreamingDetail

| Field | Description |
| --- | --- |
| `ep` |  |
| `link` |  |
| `name` |  |

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
| `Genre` | `mixed` |  |
| `Name` | `string` |  |
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
| `ep` | `int` |  |
| `exist` | `bool` |  |
| `id` | `int` |  |

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
| `jikan` | `array` |  |
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
| `Aired` | `string` |  |
| `Cover` | `string` |  |
| `DescripTion` | `string` |  |
| `Duration` | `string` |  |
| `Genres` | `array` |  |
| `ImagePath` | `string` |  |
| `MALScore` | `string` |  |
| `Name` | `string` |  |
| `Premiered` | `string` |  |
| `RatingsNum` | `int` |  |
| `Status` | `string` |  |
| `Studios` | `string` |  |
| `Synonyms` | `string` |  |
| `epCount` | `int` |  |
| `finder` | `string` |  |
| `id` | `int` |  |

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
| `Aired` | `string` |  |
| `Cover` | `string` |  |
| `DescripTion` | `string` |  |
| `Duration` | `string` |  |
| `Genres` | `array` |  |
| `ImagePath` | `string` |  |
| `MALScore` | `string` |  |
| `Name` | `string` |  |
| `Premiered` | `string` |  |
| `RatingsNum` | `int` |  |
| `Status` | `string` |  |
| `Studios` | `string` |  |
| `Synonyms` | `string` |  |
| `currentPage` | `int` |  |
| `epCount` | `int` |  |
| `finder` | `string` |  |
| `id` | `int` |  |
| `wholePage` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PaginatedAnimeList record (throws on error).
$paginated_anime_list = $client->PaginatedAnimeList()->load();
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
| `Aired` | `string` |  |
| `Cover` | `string` |  |
| `DescripTion` | `string` |  |
| `Duration` | `string` |  |
| `Genres` | `array` |  |
| `ImagePath` | `string` |  |
| `MALScore` | `string` |  |
| `Name` | `string` |  |
| `Premiered` | `string` |  |
| `RatingsNum` | `int` |  |
| `Status` | `string` |  |
| `Studios` | `string` |  |
| `Synonyms` | `string` |  |
| `epCount` | `int` |  |
| `finder` | `string` |  |
| `id` | `int` |  |

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
| `Aired` | `string` |  |
| `Cover` | `string` |  |
| `DescripTion` | `string` |  |
| `Duration` | `string` |  |
| `Genres` | `array` |  |
| `ImagePath` | `string` |  |
| `MALScore` | `string` |  |
| `Name` | `string` |  |
| `Premiered` | `string` |  |
| `RatingsNum` | `int` |  |
| `Status` | `string` |  |
| `Studios` | `string` |  |
| `Synonyms` | `string` |  |
| `epCount` | `int` |  |
| `finder` | `string` |  |
| `id` | `int` |  |

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
| `ep` | `array` |  |
| `link` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the StreamingDetail record (throws on error).
$streaming_detail = $client->StreamingDetail()->load(["id" => 1]);
```


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

- **TestFeature**: In-memory mock transport for testing without a live server

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
