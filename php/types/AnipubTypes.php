<?php
declare(strict_types=1);

// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Anime entity data model. */
class Anime
{
    public ?bool $exist = null;
    public mixed $genre;
    public string $name;
}

/** Request payload for Anime#load. */
class AnimeLoadMatch
{
    public ?bool $exist = null;
    public mixed $genre = null;
    public ?string $name = null;
}

/** Request payload for Anime#create. */
class AnimeCreateData
{
    public ?bool $exist = null;
    public mixed $genre;
    public string $name;
}

/** Find entity data model. */
class Find
{
    public ?int $ep = null;
    public bool $exist;
    public ?int $id = null;
}

/** Request payload for Find#load. */
class FindLoadMatch
{
    public string $id;
}

/** FullAnimeDetail entity data model. */
class FullAnimeDetail
{
    public ?array $character = null;
    public ?array $jikan = null;
    public ?array $local = null;
}

/** Request payload for FullAnimeDetail#load. */
class FullAnimeDetailLoadMatch
{
    public int $id;
}

/** Info entity data model. */
class Info
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
}

/** Request payload for Info#load. */
class InfoLoadMatch
{
    public string $id;
}

/** PaginatedAnimeList entity data model. */
class PaginatedAnimeList
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?int $current_page = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
    public ?array $whole_page = null;
}

/** Request payload for PaginatedAnimeList#load. */
class PaginatedAnimeListLoadMatch
{
    public ?string $genre = null;
    public ?string $name = null;
}

/** Request payload for PaginatedAnimeList#list. */
class PaginatedAnimeListListMatch
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?int $current_page = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
    public ?array $whole_page = null;
}

/** Rating entity data model. */
class Rating
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
}

/** Request payload for Rating#list. */
class RatingListMatch
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
}

/** Search entity data model. */
class Search
{
    public ?string $aired = null;
    public ?string $cover = null;
    public ?string $descrip_tion = null;
    public ?string $duration = null;
    public ?int $ep_count = null;
    public ?string $finder = null;
    public ?array $genre = null;
    public ?int $id = null;
    public ?string $image_path = null;
    public ?string $mal_score = null;
    public ?string $name = null;
    public ?string $premiered = null;
    public ?int $ratings_num = null;
    public ?string $status = null;
    public ?string $studio = null;
    public ?string $synonym = null;
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public string $id;
}

/** StreamingDetail entity data model. */
class StreamingDetail
{
    public ?array $local = null;
}

/** Request payload for StreamingDetail#load. */
class StreamingDetailLoadMatch
{
    public int $id;
}

