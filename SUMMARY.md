# AniPub API

AniPub API provides comprehensive metadata on anime, including streaming links, character details, and MAL integration. It allows users to search, filter, and sort anime data seamlessly through various endpoints. The API is free to use with no authentication required.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 8 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Anime

Results: Check result; Total number of anime in database; Last document ID.

SDK operations: `create`, `load`.

Key fields to recognise:

- `Genre`: Genre as string or array of strings
- `Name`: Anime name to match

### Find

Results: Anime found or not found response.

SDK operations: `load`.

Key fields to recognise:

- `ep`: Episode count if found
- `exist`: Whether anime exists
- `id`: Anime ID if found

### FullAnimeDetail

Results: Full anime details including MAL data and characters.

SDK operations: `load`.

Key fields to recognise:

- `jikan`: MyAnimeList data from Jikan API

### Info

Results: Successful response with anime metadata.

SDK operations: `load`.

Key fields to recognise:

- `Aired`: Air date range
- `Cover`: Cover image path or URL. Prepend https://anipub.xyz/ if relative
- `DescripTion`: Anime description
- `Duration`: Episode duration
- `Genres`: List of genres

### PaginatedAnimeList

Results: Filtered and sorted anime list; Paginated list of anime by genre; Paginated search results.

SDK operations: `list`, `load`.

Key fields to recognise:

- `Aired`: Air date range
- `Cover`: Cover image path or URL. Prepend https://anipub.xyz/ if relative
- `DescripTion`: Anime description
- `Duration`: Episode duration
- `Genres`: List of genres

### Rating

Results: Paginated list of top-rated anime.

SDK operations: `list`.

Key fields to recognise:

- `Aired`: Air date range
- `Cover`: Cover image path or URL. Prepend https://anipub.xyz/ if relative
- `DescripTion`: Anime description
- `Duration`: Episode duration
- `Genres`: List of genres

### Search

Results: Array of matching anime.

SDK operations: `load`.

Key fields to recognise:

- `Aired`: Air date range
- `Cover`: Cover image path or URL. Prepend https://anipub.xyz/ if relative
- `DescripTion`: Anime description
- `Duration`: Episode duration
- `Genres`: List of genres

### StreamingDetail

Results: Streaming links for episodes.

SDK operations: `load`.

Key fields to recognise:

- `ep`: Episodes 2+ streaming links
- `link`: Episode 1 streaming link with src= prefix
- `name`: Anime name

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Anime | `create` | `POST /api/check` | See reference |
| Anime | `load` | `GET /api/getAll` | See reference |
| Anime | `load` | `GET /api/getlast` | See reference |
| Find | `load` | `GET /api/find/{name}` | See reference |
| FullAnimeDetail | `load` | `GET /anime/api/details/{id}` | See reference |
| Info | `load` | `GET /api/info/{id}` | See reference |
| PaginatedAnimeList | `list` | `GET /api/sort` | See reference |
| PaginatedAnimeList | `load` | `GET /api/findbyGenre/{genre}` | See reference |
| PaginatedAnimeList | `load` | `GET /api/searchall/{name}` | See reference |
| Rating | `list` | `GET /api/findbyrating` | See reference |
| Search | `load` | `GET /api/search/{name}` | See reference |
| StreamingDetail | `load` | `GET /v1/api/details/{id}` | See reference |

## Connect to the API

- Production server: `https://anipub.xyz`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `anipub_list`: List records for an entity. Supported entities: `paginated_anime_list`, `rating`.
- `anipub_load`: Load one record for an entity. Supported entities: `anime`, `find`, `full_anime_detail`, `info`, `paginated_anime_list`, `search`, `streaming_detail`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

