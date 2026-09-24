<?php
declare(strict_types=1);

// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Anime entity data model. */
class Anime
{
    public mixed $Genre;
    public string $Name;
    public ?bool $exists = null;
}

/** Request payload for Anime#load. */
class AnimeLoadMatch
{
    public mixed $Genre = null;
    public ?string $Name = null;
    public ?bool $exists = null;
}

/** Request payload for Anime#create. */
class AnimeCreateData
{
    public mixed $Genre;
    public string $Name;
    public ?bool $exists = null;
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

/** FindbyGenre entity data model. */
class FindbyGenre
{
    public ?int $currentPage = null;
    public ?string $id = null;
    public ?array $wholePage = null;
}

/** Request payload for FindbyGenre#load. */
class FindbyGenreLoadMatch
{
    public string $id;
    public ?int $page = null;
}

/** FullAnimeDetail entity data model. */
class FullAnimeDetail
{
    public ?array $characters = null;
    public ?string $id = null;
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
    public ?string $Aired = null;
    public ?string $Cover = null;
    public ?string $DescripTion = null;
    public ?string $Duration = null;
    public ?array $Genres = null;
    public ?string $ImagePath = null;
    public ?string $MALScore = null;
    public ?string $Name = null;
    public ?string $Premiered = null;
    public ?int $RatingsNum = null;
    public ?string $Status = null;
    public ?string $Studios = null;
    public ?string $Synonyms = null;
    public ?int $epCount = null;
    public ?string $finder = null;
    public ?int $id = null;
}

/** Request payload for Info#load. */
class InfoLoadMatch
{
    public string $id;
}

/** Rating entity data model. */
class Rating
{
    public ?string $Aired = null;
    public ?string $Cover = null;
    public ?string $DescripTion = null;
    public ?string $Duration = null;
    public ?array $Genres = null;
    public ?string $ImagePath = null;
    public ?string $MALScore = null;
    public ?string $Name = null;
    public ?string $Premiered = null;
    public ?int $RatingsNum = null;
    public ?string $Status = null;
    public ?string $Studios = null;
    public ?string $Synonyms = null;
    public ?int $epCount = null;
    public ?string $finder = null;
    public ?int $id = null;
}

/** Request payload for Rating#list. */
class RatingListMatch
{
    public ?int $page = null;
}

/** Search entity data model. */
class Search
{
    public ?string $Aired = null;
    public ?string $Cover = null;
    public ?string $DescripTion = null;
    public ?string $Duration = null;
    public ?array $Genres = null;
    public ?string $ImagePath = null;
    public ?string $MALScore = null;
    public ?string $Name = null;
    public ?string $Premiered = null;
    public ?int $RatingsNum = null;
    public ?string $Status = null;
    public ?string $Studios = null;
    public ?string $Synonyms = null;
    public ?int $epCount = null;
    public ?string $finder = null;
    public ?int $id = null;
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public string $id;
}

/** Searchall entity data model. */
class Searchall
{
    public ?int $currentPage = null;
    public ?string $id = null;
    public ?array $wholePage = null;
}

/** Request payload for Searchall#load. */
class SearchallLoadMatch
{
    public string $id;
    public ?int $page = null;
}

/** Sort entity data model. */
class Sort
{
    public ?string $Aired = null;
    public ?string $Cover = null;
    public ?string $DescripTion = null;
    public ?string $Duration = null;
    public ?array $Genres = null;
    public ?string $ImagePath = null;
    public ?string $MALScore = null;
    public ?string $Name = null;
    public ?string $Premiered = null;
    public ?int $RatingsNum = null;
    public ?string $Status = null;
    public ?string $Studios = null;
    public ?string $Synonyms = null;
    public ?int $epCount = null;
    public ?string $finder = null;
    public ?int $id = null;
}

/** Request payload for Sort#list. */
class SortListMatch
{
    public ?string $genre = null;
    public ?string $name = null;
    public ?int $page = null;
    public ?float $ratefrom = null;
    public ?float $rateto = null;
}

/** StreamingDetail entity data model. */
class StreamingDetail
{
    public ?array $ep = null;
    public ?string $id = null;
    public ?string $link = null;
    public ?string $name = null;
}

/** Request payload for StreamingDetail#load. */
class StreamingDetailLoadMatch
{
    public int $id;
}

