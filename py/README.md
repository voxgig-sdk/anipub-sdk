# Anipub Python SDK



The Python SDK for the Anipub API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Anime()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/anipub-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from anipub_sdk import AnipubSDK

client = AnipubSDK()
```

### 3. Load an anime

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    anime = client.Anime().load()
    print(anime)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.Anime().create({"genre": "example_genre", "name": "example_name"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    anime = client.Anime().load()
    print(anime)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = AnipubSDK.test()

# Entity ops return the bare record and raise on error.
anime = client.Anime().load()
# anime contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = AnipubSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### AnipubSDK

```python
from anipub_sdk import AnipubSDK

client = AnipubSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = AnipubSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### AnipubSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Anime

| Field | Description |
| --- | --- |
| `exist` |  |
| `genre` |  |
| `name` |  |

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
| `character` |  |
| `jikan` |  |
| `local` |  |

Operations: Load.

API path: `/anime/api/details/{id}`

#### Info

| Field | Description |
| --- | --- |
| `aired` |  |
| `cover` |  |
| `descrip_tion` |  |
| `duration` |  |
| `ep_count` |  |
| `finder` |  |
| `genre` |  |
| `id` |  |
| `image_path` |  |
| `mal_score` |  |
| `name` |  |
| `premiered` |  |
| `ratings_num` |  |
| `status` |  |
| `studio` |  |
| `synonym` |  |

Operations: Load.

API path: `/api/info/{id}`

#### PaginatedAnimeList

| Field | Description |
| --- | --- |
| `aired` |  |
| `cover` |  |
| `current_page` |  |
| `descrip_tion` |  |
| `duration` |  |
| `ep_count` |  |
| `finder` |  |
| `genre` |  |
| `id` |  |
| `image_path` |  |
| `mal_score` |  |
| `name` |  |
| `premiered` |  |
| `ratings_num` |  |
| `status` |  |
| `studio` |  |
| `synonym` |  |
| `whole_page` |  |

Operations: List, Load.

API path: `/api/sort`

#### Rating

| Field | Description |
| --- | --- |
| `aired` |  |
| `cover` |  |
| `descrip_tion` |  |
| `duration` |  |
| `ep_count` |  |
| `finder` |  |
| `genre` |  |
| `id` |  |
| `image_path` |  |
| `mal_score` |  |
| `name` |  |
| `premiered` |  |
| `ratings_num` |  |
| `status` |  |
| `studio` |  |
| `synonym` |  |

Operations: List.

API path: `/api/findbyrating`

#### Search

| Field | Description |
| --- | --- |
| `aired` |  |
| `cover` |  |
| `descrip_tion` |  |
| `duration` |  |
| `ep_count` |  |
| `finder` |  |
| `genre` |  |
| `id` |  |
| `image_path` |  |
| `mal_score` |  |
| `name` |  |
| `premiered` |  |
| `ratings_num` |  |
| `status` |  |
| `studio` |  |
| `synonym` |  |

Operations: Load.

API path: `/api/search/{name}`

#### StreamingDetail

| Field | Description |
| --- | --- |
| `local` |  |

Operations: Load.

API path: `/v1/api/details/{id}`



## Entities


### Anime

Create an instance: `anime = client.Anime()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exist` | `bool` |  |
| `genre` | `Any` |  |
| `name` | `str` |  |

#### Example: Load

```python
anime = client.Anime().load()
```

#### Example: Create

```python
anime = client.Anime().create({
    "genre": "example_genre",  # Any
    "name": "example_name",  # str
})
```


### Find

Create an instance: `find = client.Find()`

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

```python
find = client.Find().load({"id": "find_id"})
```


### FullAnimeDetail

Create an instance: `full_anime_detail = client.FullAnimeDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `character` | `list` |  |
| `jikan` | `dict` |  |
| `local` | `dict` |  |

#### Example: Load

```python
full_anime_detail = client.FullAnimeDetail().load({"id": 1})
```


### Info

Create an instance: `info = client.Info()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aired` | `str` |  |
| `cover` | `str` |  |
| `descrip_tion` | `str` |  |
| `duration` | `str` |  |
| `ep_count` | `int` |  |
| `finder` | `str` |  |
| `genre` | `list` |  |
| `id` | `int` |  |
| `image_path` | `str` |  |
| `mal_score` | `str` |  |
| `name` | `str` |  |
| `premiered` | `str` |  |
| `ratings_num` | `int` |  |
| `status` | `str` |  |
| `studio` | `str` |  |
| `synonym` | `str` |  |

#### Example: Load

```python
info = client.Info().load({"id": "info_id"})
```


### PaginatedAnimeList

Create an instance: `paginated_anime_list = client.PaginatedAnimeList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aired` | `str` |  |
| `cover` | `str` |  |
| `current_page` | `int` |  |
| `descrip_tion` | `str` |  |
| `duration` | `str` |  |
| `ep_count` | `int` |  |
| `finder` | `str` |  |
| `genre` | `list` |  |
| `id` | `int` |  |
| `image_path` | `str` |  |
| `mal_score` | `str` |  |
| `name` | `str` |  |
| `premiered` | `str` |  |
| `ratings_num` | `int` |  |
| `status` | `str` |  |
| `studio` | `str` |  |
| `synonym` | `str` |  |
| `whole_page` | `list` |  |

#### Example: Load

```python
paginated_anime_list = client.PaginatedAnimeList().load()
```

#### Example: List

```python
paginated_anime_lists = client.PaginatedAnimeList().list()
```


### Rating

Create an instance: `rating = client.Rating()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aired` | `str` |  |
| `cover` | `str` |  |
| `descrip_tion` | `str` |  |
| `duration` | `str` |  |
| `ep_count` | `int` |  |
| `finder` | `str` |  |
| `genre` | `list` |  |
| `id` | `int` |  |
| `image_path` | `str` |  |
| `mal_score` | `str` |  |
| `name` | `str` |  |
| `premiered` | `str` |  |
| `ratings_num` | `int` |  |
| `status` | `str` |  |
| `studio` | `str` |  |
| `synonym` | `str` |  |

#### Example: List

```python
ratings = client.Rating().list()
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aired` | `str` |  |
| `cover` | `str` |  |
| `descrip_tion` | `str` |  |
| `duration` | `str` |  |
| `ep_count` | `int` |  |
| `finder` | `str` |  |
| `genre` | `list` |  |
| `id` | `int` |  |
| `image_path` | `str` |  |
| `mal_score` | `str` |  |
| `name` | `str` |  |
| `premiered` | `str` |  |
| `ratings_num` | `int` |  |
| `status` | `str` |  |
| `studio` | `str` |  |
| `synonym` | `str` |  |

#### Example: Load

```python
search = client.Search().load({"id": "search_id"})
```


### StreamingDetail

Create an instance: `streaming_detail = client.StreamingDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `local` | `dict` |  |

#### Example: Load

```python
streaming_detail = client.StreamingDetail().load({"id": 1})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── anipub_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`anipub_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
anime = client.Anime()
anime.load()

# anime.data_get() now returns the anime data from the last load
# anime.match_get() returns the last match criteria
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
