# Anipub TypeScript SDK Reference

Complete API reference for the Anipub TypeScript SDK.


## AnipubSDK

### Constructor

```ts
new AnipubSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AnipubSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AnipubSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AnipubSDK` instance in test mode.


### Instance Methods

#### `Anime(data?: object)`

Create a new `Anime` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AnimeEntity` instance.

#### `Find(data?: object)`

Create a new `Find` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FindEntity` instance.

#### `FullAnimeDetail(data?: object)`

Create a new `FullAnimeDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FullAnimeDetailEntity` instance.

#### `Info(data?: object)`

Create a new `Info` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InfoEntity` instance.

#### `PaginatedAnimeList(data?: object)`

Create a new `PaginatedAnimeList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaginatedAnimeListEntity` instance.

#### `Rating(data?: object)`

Create a new `Rating` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RatingEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `StreamingDetail(data?: object)`

Create a new `StreamingDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StreamingDetailEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AnipubSDK.test()`.

**Returns:** `AnipubSDK` instance in test mode.


---

## AnimeEntity

```ts
const anime = client.Anime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exist` | `boolean` | No |  |
| `genre` | `any` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Anime().create({
  genre: 'example_genre',
  name: 'example_name',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Anime().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AnimeEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FindEntity

```ts
const find = client.Find()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `number` | No |  |
| `exist` | `boolean` | Yes |  |
| `id` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Find().load({ id: 'find_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FindEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FullAnimeDetailEntity

```ts
const full_anime_detail = client.FullAnimeDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `any[]` | No |  |
| `jikan` | `Record<string, any>` | No |  |
| `local` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FullAnimeDetail().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FullAnimeDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InfoEntity

```ts
const info = client.Info()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `string` | No |  |
| `cover` | `string` | No |  |
| `descrip_tion` | `string` | No |  |
| `duration` | `string` | No |  |
| `ep_count` | `number` | No |  |
| `finder` | `string` | No |  |
| `genre` | `any[]` | No |  |
| `id` | `number` | No |  |
| `image_path` | `string` | No |  |
| `mal_score` | `string` | No |  |
| `name` | `string` | No |  |
| `premiered` | `string` | No |  |
| `ratings_num` | `number` | No |  |
| `status` | `string` | No |  |
| `studio` | `string` | No |  |
| `synonym` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Info().load({ id: 'info_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaginatedAnimeListEntity

```ts
const paginated_anime_list = client.PaginatedAnimeList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `string` | No |  |
| `cover` | `string` | No |  |
| `current_page` | `number` | No |  |
| `descrip_tion` | `string` | No |  |
| `duration` | `string` | No |  |
| `ep_count` | `number` | No |  |
| `finder` | `string` | No |  |
| `genre` | `any[]` | No |  |
| `id` | `number` | No |  |
| `image_path` | `string` | No |  |
| `mal_score` | `string` | No |  |
| `name` | `string` | No |  |
| `premiered` | `string` | No |  |
| `ratings_num` | `number` | No |  |
| `status` | `string` | No |  |
| `studio` | `string` | No |  |
| `synonym` | `string` | No |  |
| `whole_page` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PaginatedAnimeList().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PaginatedAnimeList().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaginatedAnimeListEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RatingEntity

```ts
const rating = client.Rating()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `string` | No |  |
| `cover` | `string` | No |  |
| `descrip_tion` | `string` | No |  |
| `duration` | `string` | No |  |
| `ep_count` | `number` | No |  |
| `finder` | `string` | No |  |
| `genre` | `any[]` | No |  |
| `id` | `number` | No |  |
| `image_path` | `string` | No |  |
| `mal_score` | `string` | No |  |
| `name` | `string` | No |  |
| `premiered` | `string` | No |  |
| `ratings_num` | `number` | No |  |
| `status` | `string` | No |  |
| `studio` | `string` | No |  |
| `synonym` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Rating().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RatingEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `string` | No |  |
| `cover` | `string` | No |  |
| `descrip_tion` | `string` | No |  |
| `duration` | `string` | No |  |
| `ep_count` | `number` | No |  |
| `finder` | `string` | No |  |
| `genre` | `any[]` | No |  |
| `id` | `number` | No |  |
| `image_path` | `string` | No |  |
| `mal_score` | `string` | No |  |
| `name` | `string` | No |  |
| `premiered` | `string` | No |  |
| `ratings_num` | `number` | No |  |
| `status` | `string` | No |  |
| `studio` | `string` | No |  |
| `synonym` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Search().load({ id: 'search_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StreamingDetailEntity

```ts
const streaming_detail = client.StreamingDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `local` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.StreamingDetail().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StreamingDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `AnipubSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new AnipubSDK({
  feature: {
    test: { active: true },
  }
})
```

