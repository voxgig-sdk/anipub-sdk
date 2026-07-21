# Anipub Python SDK Reference

Complete API reference for the Anipub Python SDK.


## AnipubSDK

### Constructor

```python
from anipub_sdk import AnipubSDK

client = AnipubSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AnipubSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AnipubSDK.test()
```


### Instance Methods

#### `Anime(data=None)`

Create a new `AnimeEntity` instance. Pass `None` for no initial data.

#### `Find(data=None)`

Create a new `FindEntity` instance. Pass `None` for no initial data.

#### `FullAnimeDetail(data=None)`

Create a new `FullAnimeDetailEntity` instance. Pass `None` for no initial data.

#### `Info(data=None)`

Create a new `InfoEntity` instance. Pass `None` for no initial data.

#### `PaginatedAnimeList(data=None)`

Create a new `PaginatedAnimeListEntity` instance. Pass `None` for no initial data.

#### `Rating(data=None)`

Create a new `RatingEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `StreamingDetail(data=None)`

Create a new `StreamingDetailEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AnimeEntity

```python
anime = client.Anime()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exist` | `bool` | No |  |
| `genre` | `Any` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Anime().create({
    "genre": "example_genre",  # Any
    "name": "example_name",  # str
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Anime().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AnimeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FindEntity

```python
find = client.Find()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ep` | `int` | No |  |
| `exist` | `bool` | Yes |  |
| `id` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Find().load({"id": "find_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FindEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FullAnimeDetailEntity

```python
full_anime_detail = client.FullAnimeDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `character` | `list` | No |  |
| `jikan` | `dict` | No |  |
| `local` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FullAnimeDetail().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FullAnimeDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InfoEntity

```python
info = client.Info()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `str` | No |  |
| `cover` | `str` | No |  |
| `descrip_tion` | `str` | No |  |
| `duration` | `str` | No |  |
| `ep_count` | `int` | No |  |
| `finder` | `str` | No |  |
| `genre` | `list` | No |  |
| `id` | `int` | No |  |
| `image_path` | `str` | No |  |
| `mal_score` | `str` | No |  |
| `name` | `str` | No |  |
| `premiered` | `str` | No |  |
| `ratings_num` | `int` | No |  |
| `status` | `str` | No |  |
| `studio` | `str` | No |  |
| `synonym` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Info().load({"id": "info_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InfoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaginatedAnimeListEntity

```python
paginated_anime_list = client.PaginatedAnimeList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `str` | No |  |
| `cover` | `str` | No |  |
| `current_page` | `int` | No |  |
| `descrip_tion` | `str` | No |  |
| `duration` | `str` | No |  |
| `ep_count` | `int` | No |  |
| `finder` | `str` | No |  |
| `genre` | `list` | No |  |
| `id` | `int` | No |  |
| `image_path` | `str` | No |  |
| `mal_score` | `str` | No |  |
| `name` | `str` | No |  |
| `premiered` | `str` | No |  |
| `ratings_num` | `int` | No |  |
| `status` | `str` | No |  |
| `studio` | `str` | No |  |
| `synonym` | `str` | No |  |
| `whole_page` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PaginatedAnimeList().list()
for paginated_anime_list in results:
    print(paginated_anime_list)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PaginatedAnimeList().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaginatedAnimeListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RatingEntity

```python
rating = client.Rating()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `str` | No |  |
| `cover` | `str` | No |  |
| `descrip_tion` | `str` | No |  |
| `duration` | `str` | No |  |
| `ep_count` | `int` | No |  |
| `finder` | `str` | No |  |
| `genre` | `list` | No |  |
| `id` | `int` | No |  |
| `image_path` | `str` | No |  |
| `mal_score` | `str` | No |  |
| `name` | `str` | No |  |
| `premiered` | `str` | No |  |
| `ratings_num` | `int` | No |  |
| `status` | `str` | No |  |
| `studio` | `str` | No |  |
| `synonym` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Rating().list()
for rating in results:
    print(rating)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RatingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aired` | `str` | No |  |
| `cover` | `str` | No |  |
| `descrip_tion` | `str` | No |  |
| `duration` | `str` | No |  |
| `ep_count` | `int` | No |  |
| `finder` | `str` | No |  |
| `genre` | `list` | No |  |
| `id` | `int` | No |  |
| `image_path` | `str` | No |  |
| `mal_score` | `str` | No |  |
| `name` | `str` | No |  |
| `premiered` | `str` | No |  |
| `ratings_num` | `int` | No |  |
| `status` | `str` | No |  |
| `studio` | `str` | No |  |
| `synonym` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Search().load({"id": "search_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StreamingDetailEntity

```python
streaming_detail = client.StreamingDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `local` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.StreamingDetail().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StreamingDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = AnipubSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

