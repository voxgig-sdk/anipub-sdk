-- Typed models for the Anipub SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Anime
---@field exist? boolean
---@field genre any
---@field name string

---@class AnimeLoadMatch
---@field exist? boolean
---@field genre? any
---@field name? string

---@class AnimeCreateData
---@field exist? boolean
---@field genre any
---@field name string

---@class Find
---@field ep? number
---@field exist boolean
---@field id? number

---@class FindLoadMatch
---@field id string

---@class FullAnimeDetail
---@field character? table
---@field jikan? table
---@field local? table

---@class FullAnimeDetailLoadMatch
---@field id number

---@class Info
---@field aired? string
---@field cover? string
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string

---@class InfoLoadMatch
---@field id string

---@class PaginatedAnimeList
---@field aired? string
---@field cover? string
---@field current_page? number
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string
---@field whole_page? table

---@class PaginatedAnimeListLoadMatch
---@field genre? string
---@field name? string

---@class PaginatedAnimeListListMatch
---@field aired? string
---@field cover? string
---@field current_page? number
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string
---@field whole_page? table

---@class Rating
---@field aired? string
---@field cover? string
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string

---@class RatingListMatch
---@field aired? string
---@field cover? string
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string

---@class Search
---@field aired? string
---@field cover? string
---@field descrip_tion? string
---@field duration? string
---@field ep_count? number
---@field finder? string
---@field genre? table
---@field id? number
---@field image_path? string
---@field mal_score? string
---@field name? string
---@field premiered? string
---@field ratings_num? number
---@field status? string
---@field studio? string
---@field synonym? string

---@class SearchLoadMatch
---@field id string

---@class StreamingDetail
---@field local? table

---@class StreamingDetailLoadMatch
---@field id number

local M = {}

return M
