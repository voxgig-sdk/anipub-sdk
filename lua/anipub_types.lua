-- Typed models for the Anipub SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Anime
---@field Genre any
---@field Name string
---@field exists? boolean

---@class AnimeLoadMatch
---@field Genre? any
---@field Name? string
---@field exists? boolean

---@class AnimeCreateData
---@field Genre any
---@field Name string
---@field exists? boolean

---@class Find
---@field ep? number
---@field exist boolean
---@field id? number

---@class FindLoadMatch
---@field id string

---@class FullAnimeDetail
---@field characters? table
---@field jikan? table
---@field local? table

---@class FullAnimeDetailLoadMatch
---@field id number

---@class Info
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field epCount? number
---@field finder? string
---@field id? number

---@class InfoLoadMatch
---@field id string

---@class PaginatedAnimeList
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field currentPage? number
---@field epCount? number
---@field finder? string
---@field id? number
---@field wholePage? table

---@class PaginatedAnimeListLoadMatch
---@field genre? string
---@field name? string

---@class PaginatedAnimeListListMatch
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field currentPage? number
---@field epCount? number
---@field finder? string
---@field id? number
---@field wholePage? table

---@class Rating
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field epCount? number
---@field finder? string
---@field id? number

---@class RatingListMatch
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field epCount? number
---@field finder? string
---@field id? number

---@class Search
---@field Aired? string
---@field Cover? string
---@field DescripTion? string
---@field Duration? string
---@field Genres? table
---@field ImagePath? string
---@field MALScore? string
---@field Name? string
---@field Premiered? string
---@field RatingsNum? number
---@field Status? string
---@field Studios? string
---@field Synonyms? string
---@field epCount? number
---@field finder? string
---@field id? number

---@class SearchLoadMatch
---@field id string

---@class StreamingDetail
---@field ep? table
---@field link? string
---@field name? string

---@class StreamingDetailLoadMatch
---@field id number

local M = {}

return M
