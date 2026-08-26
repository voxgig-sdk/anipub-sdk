# Anipub PHP SDK Reference

Complete API reference for the Anipub PHP SDK.


## AnipubSDK

### Constructor

```php
require_once __DIR__ . '/anipub_sdk.php';

$client = new AnipubSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AnipubSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AnipubSDK::test();
```


### Instance Methods

#### `Anime($data = null)`

Create a new `AnimeEntity` instance. Pass `null` for no initial data.

#### `Find($data = null)`

Create a new `FindEntity` instance. Pass `null` for no initial data.

#### `FullAnimeDetail($data = null)`

Create a new `FullAnimeDetailEntity` instance. Pass `null` for no initial data.

#### `Info($data = null)`

Create a new `InfoEntity` instance. Pass `null` for no initial data.

#### `PaginatedAnimeList($data = null)`

Create a new `PaginatedAnimeListEntity` instance. Pass `null` for no initial data.

#### `Rating($data = null)`

Create a new `RatingEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `StreamingDetail($data = null)`

Create a new `StreamingDetailEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AnipubUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AnimeEntity

```php
$anime = $client->Anime();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Genre` | `mixed` | Yes | Genre as string or array of strings |
| `Name` | `string` | Yes | Anime name to match |
| `exists` | `bool` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Anime()->create([
  "Genre" => null, // mixed
  "Name" => null, // string
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Anime()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AnimeEntity`

Create a new `AnimeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FindEntity

```php
$find = $client->Find();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `int` | No | Episode count if found |
| `exist` | `bool` | Yes | Whether anime exists |
| `id` | `int` | No | Anime ID if found |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Find()->load(["id" => "find_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FindEntity`

Create a new `FindEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FullAnimeDetailEntity

```php
$full_anime_detail = $client->FullAnimeDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `characters` | `array` | No |  |
| `id` | `string` | No |  |
| `jikan` | `array` | No | MyAnimeList data from Jikan API |
| `local` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FullAnimeDetail()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FullAnimeDetailEntity`

Create a new `FullAnimeDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InfoEntity

```php
$info = $client->Info();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `array` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `int` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `int` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `int` | No | Anime ID |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Info()->load(["id" => "info_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InfoEntity`

Create a new `InfoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaginatedAnimeListEntity

```php
$paginated_anime_list = $client->PaginatedAnimeList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `array` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `int` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `currentPage` | `int` | No | Current page number |
| `epCount` | `int` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `int` | No | Anime ID |
| `wholePage` | `array` | No | Array of anime on current page |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PaginatedAnimeList()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PaginatedAnimeList()->load(["genre" => "genre"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaginatedAnimeListEntity`

Create a new `PaginatedAnimeListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RatingEntity

```php
$rating = $client->Rating();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `array` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `int` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `int` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `int` | No | Anime ID |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Rating()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RatingEntity`

Create a new `RatingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `Aired` | `string` | No | Air date range |
| `Cover` | `string` | No | Cover image path or URL. |
| `DescripTion` | `string` | No | Anime description |
| `Duration` | `string` | No | Episode duration |
| `Genres` | `array` | No | List of genres |
| `ImagePath` | `string` | No | Image path or URL. |
| `MALScore` | `string` | No | MyAnimeList score |
| `Name` | `string` | No | Anime name |
| `Premiered` | `string` | No | Premiere season |
| `RatingsNum` | `int` | No | Number of ratings |
| `Status` | `string` | No | Airing status |
| `Studios` | `string` | No | Production studio |
| `Synonyms` | `string` | No | Alternative names |
| `epCount` | `int` | No | Episode count |
| `finder` | `string` | No | Slug identifier |
| `id` | `int` | No | Anime ID |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Search()->load(["id" => "search_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StreamingDetailEntity

```php
$streaming_detail = $client->StreamingDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `array` | No | Episodes 2+ streaming links |
| `id` | `string` | No |  |
| `link` | `string` | No | Episode 1 streaming link with src= prefix |
| `name` | `string` | No | Anime name |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->StreamingDetail()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StreamingDetailEntity`

Create a new `StreamingDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new AnipubSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

