# Typed models for the Anipub SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AnimeRequired(TypedDict):
    Genre: Any
    Name: str


class Anime(AnimeRequired, total=False):
    exists: bool


class AnimeLoadMatch(TypedDict, total=False):
    Genre: Any
    Name: str
    exists: bool


class AnimeCreateDataRequired(TypedDict):
    Genre: Any
    Name: str


class AnimeCreateData(AnimeCreateDataRequired, total=False):
    exists: bool


class FindRequired(TypedDict):
    exist: bool


class Find(FindRequired, total=False):
    ep: int
    id: int


class FindLoadMatch(TypedDict):
    id: str


class FullAnimeDetail(TypedDict, total=False):
    characters: list
    jikan: dict
    local: dict


class FullAnimeDetailLoadMatch(TypedDict):
    id: int


class Info(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    epCount: int
    finder: str
    id: int


class InfoLoadMatch(TypedDict):
    id: str


class PaginatedAnimeList(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    currentPage: int
    epCount: int
    finder: str
    id: int
    wholePage: list


class PaginatedAnimeListLoadMatch(TypedDict, total=False):
    genre: str
    name: str


class PaginatedAnimeListListMatch(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    currentPage: int
    epCount: int
    finder: str
    id: int
    wholePage: list


class Rating(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    epCount: int
    finder: str
    id: int


class RatingListMatch(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    epCount: int
    finder: str
    id: int


class Search(TypedDict, total=False):
    Aired: str
    Cover: str
    DescripTion: str
    Duration: str
    Genres: list
    ImagePath: str
    MALScore: str
    Name: str
    Premiered: str
    RatingsNum: int
    Status: str
    Studios: str
    Synonyms: str
    epCount: int
    finder: str
    id: int


class SearchLoadMatch(TypedDict):
    id: str


class StreamingDetail(TypedDict, total=False):
    ep: list
    link: str
    name: str


class StreamingDetailLoadMatch(TypedDict):
    id: int
