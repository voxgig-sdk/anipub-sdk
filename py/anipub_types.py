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
    genre: Any
    name: str


class Anime(AnimeRequired, total=False):
    exist: bool


class AnimeLoadMatch(TypedDict, total=False):
    exist: bool
    genre: Any
    name: str


class AnimeCreateDataRequired(TypedDict):
    genre: Any
    name: str


class AnimeCreateData(AnimeCreateDataRequired, total=False):
    exist: bool


class FindRequired(TypedDict):
    exist: bool


class Find(FindRequired, total=False):
    ep: int
    id: int


class FindLoadMatch(TypedDict):
    id: str


class FullAnimeDetail(TypedDict, total=False):
    character: list
    jikan: dict
    local: dict


class FullAnimeDetailLoadMatch(TypedDict):
    id: int


class Info(TypedDict, total=False):
    aired: str
    cover: str
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str


class InfoLoadMatch(TypedDict):
    id: str


class PaginatedAnimeList(TypedDict, total=False):
    aired: str
    cover: str
    current_page: int
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str
    whole_page: list


class PaginatedAnimeListLoadMatch(TypedDict, total=False):
    genre: str
    name: str


class PaginatedAnimeListListMatch(TypedDict, total=False):
    aired: str
    cover: str
    current_page: int
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str
    whole_page: list


class Rating(TypedDict, total=False):
    aired: str
    cover: str
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str


class RatingListMatch(TypedDict, total=False):
    aired: str
    cover: str
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str


class Search(TypedDict, total=False):
    aired: str
    cover: str
    descrip_tion: str
    duration: str
    ep_count: int
    finder: str
    genre: list
    id: int
    image_path: str
    mal_score: str
    name: str
    premiered: str
    ratings_num: int
    status: str
    studio: str
    synonym: str


class SearchLoadMatch(TypedDict):
    id: str


class StreamingDetail(TypedDict, total=False):
    local: dict


class StreamingDetailLoadMatch(TypedDict):
    id: int
