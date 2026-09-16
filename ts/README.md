# Anipub TypeScript SDK



The TypeScript SDK for the Anipub API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Anime()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/anipub-sdk/releases](https://github.com/voxgig-sdk/anipub-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AnipubSDK } from '@voxgig-sdk/anipub-sdk'

const client = new AnipubSDK()
```

### 3. Load a paginatedanimelist

PaginatedAnimeList is nested under genre, so provide the `genre`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const paginatedanimelist = await client.PaginatedAnimeList().load({
    genre: 'example_genre',
  })
  console.log(paginatedanimelist)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Anime ENTITY (.data() for the record)
const created = await client.Anime().create({
  Genre: 'example_Genre',
  Name: 'example_Name',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const ratings = await client.Rating().list()
  console.log(ratings)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AnipubSDK.test()

const rating = await client.Rating().list()
// rating is the entity, populated with mock response data
// — call rating.data() for the record itself
console.log(rating)
```

You can also use the instance method:

```ts
const client = new AnipubSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Rating()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AnipubSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ANIPUB_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### AnipubSDK

#### Constructor

```ts
new AnipubSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Anime(data?)` | `AnimeEntity` | Create an Anime entity instance. |
| `Find(data?)` | `FindEntity` | Create a Find entity instance. |
| `FullAnimeDetail(data?)` | `FullAnimeDetailEntity` | Create a FullAnimeDetail entity instance. |
| `Info(data?)` | `InfoEntity` | Create an Info entity instance. |
| `PaginatedAnimeList(data?)` | `PaginatedAnimeListEntity` | Create a PaginatedAnimeList entity instance. |
| `Rating(data?)` | `RatingEntity` | Create a Rating entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `StreamingDetail(data?)` | `StreamingDetailEntity` | Create a StreamingDetail entity instance. |
| `tester(testopts?, sdkopts?)` | `AnipubSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AnipubSDK.test(testopts?, sdkopts?)` | `AnipubSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AnipubSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Anime

| Field | Description |
| --- | --- |
| `Genre` | Genre as string or array of strings |
| `Name` | Anime name to match |
| `exists` |  |

Operations: create, load.

API path: `/api/check`

#### Find

| Field | Description |
| --- | --- |
| `ep` | Episode count if found |
| `exist` | Whether anime exists |
| `id` | Anime ID if found |

Operations: load.

API path: `/api/find/{name}`

#### FullAnimeDetail

| Field | Description |
| --- | --- |
| `characters` |  |
| `id` |  |
| `jikan` | MyAnimeList data from Jikan API |
| `local` |  |

Operations: load.

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

Operations: load.

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

Operations: list, load.

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

Operations: list.

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

Operations: load.

API path: `/api/search/{name}`

#### StreamingDetail

| Field | Description |
| --- | --- |
| `ep` | Episodes 2+ streaming links |
| `id` |  |
| `link` | Episode 1 streaming link with src= prefix |
| `name` | Anime name |

Operations: load.

API path: `/v1/api/details/{id}`



## Entities


### Anime

Create an instance: `const anime = client.Anime()`

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

```ts
const anime = await client.Anime().load()
```

#### Example: Create

```ts
const anime = await client.Anime().create({
  Genre: 'example_Genre',
  Name: 'example_Name',
})
```


### Find

Create an instance: `const find = client.Find()`

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

```ts
const find = await client.Find().load({ id: 'find_id' })
```


### FullAnimeDetail

Create an instance: `const full_anime_detail = client.FullAnimeDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `characters` | `any[]` |  |
| `id` | `string` |  |
| `jikan` | `Record<string, any>` | MyAnimeList data from Jikan API |
| `local` | `Record<string, any>` |  |

#### Example: Load

```ts
const full_anime_detail = await client.FullAnimeDetail().load({ id: 1 })
```


### Info

Create an instance: `const info = client.Info()`

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
| `Genres` | `any[]` | List of genres |
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

```ts
const info = await client.Info().load({ id: 'info_id' })
```


### PaginatedAnimeList

Create an instance: `const paginated_anime_list = client.PaginatedAnimeList()`

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
| `Genres` | `any[]` | List of genres |
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
| `wholePage` | `any[]` | Array of anime on current page |

#### Example: Load

```ts
const paginated_anime_list = await client.PaginatedAnimeList().load({ genre: 'genre' })
```

#### Example: List

```ts
const paginated_anime_lists = await client.PaginatedAnimeList().list()
```


### Rating

Create an instance: `const rating = client.Rating()`

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
| `Genres` | `any[]` | List of genres |
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

```ts
const ratings = await client.Rating().list()
```


### Search

Create an instance: `const search = client.Search()`

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
| `Genres` | `any[]` | List of genres |
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

```ts
const search = await client.Search().load({ id: 'search_id' })
```


### StreamingDetail

Create an instance: `const streaming_detail = client.StreamingDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ep` | `any[]` | Episodes 2+ streaming links |
| `id` | `string` |  |
| `link` | `string` | Episode 1 streaming link with src= prefix |
| `name` | `string` | Anime name |

#### Example: Load

```ts
const streaming_detail = await client.StreamingDetail().load({ id: 1 })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
anipub/
├── src/
│   ├── AnipubSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AnipubSDK } from '@voxgig-sdk/anipub-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const rating = client.Rating()
await rating.list()

// rating.data() now returns the rating data from the last `list`
// rating.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
