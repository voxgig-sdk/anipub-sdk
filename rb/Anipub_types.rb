# frozen_string_literal: true

# Typed models for the Anipub SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Anime entity data model.
#
# @!attribute [rw] exist
#   @return [Boolean, nil]
#
# @!attribute [rw] genre
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
Anime = Struct.new(
  :exist,
  :genre,
  :name,
  keyword_init: true
)

# Request payload for Anime#load.
#
# @!attribute [rw] exist
#   @return [Boolean, nil]
#
# @!attribute [rw] genre
#   @return [Object, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AnimeLoadMatch = Struct.new(
  :exist,
  :genre,
  :name,
  keyword_init: true
)

# Request payload for Anime#create.
#
# @!attribute [rw] exist
#   @return [Boolean, nil]
#
# @!attribute [rw] genre
#   @return [Object]
#
# @!attribute [rw] name
#   @return [String]
AnimeCreateData = Struct.new(
  :exist,
  :genre,
  :name,
  keyword_init: true
)

# Find entity data model.
#
# @!attribute [rw] ep
#   @return [Integer, nil]
#
# @!attribute [rw] exist
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [Integer, nil]
Find = Struct.new(
  :ep,
  :exist,
  :id,
  keyword_init: true
)

# Request payload for Find#load.
#
# @!attribute [rw] id
#   @return [String]
FindLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# FullAnimeDetail entity data model.
#
# @!attribute [rw] character
#   @return [Array, nil]
#
# @!attribute [rw] jikan
#   @return [Hash, nil]
#
# @!attribute [rw] local
#   @return [Hash, nil]
FullAnimeDetail = Struct.new(
  :character,
  :jikan,
  :local,
  keyword_init: true
)

# Request payload for FullAnimeDetail#load.
#
# @!attribute [rw] id
#   @return [Integer]
FullAnimeDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Info entity data model.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
Info = Struct.new(
  :aired,
  :cover,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  keyword_init: true
)

# Request payload for Info#load.
#
# @!attribute [rw] id
#   @return [String]
InfoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# PaginatedAnimeList entity data model.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] current_page
#   @return [Integer, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
#
# @!attribute [rw] whole_page
#   @return [Array, nil]
PaginatedAnimeList = Struct.new(
  :aired,
  :cover,
  :current_page,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  :whole_page,
  keyword_init: true
)

# Request payload for PaginatedAnimeList#load.
#
# @!attribute [rw] genre
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
PaginatedAnimeListLoadMatch = Struct.new(
  :genre,
  :name,
  keyword_init: true
)

# Request payload for PaginatedAnimeList#list.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] current_page
#   @return [Integer, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
#
# @!attribute [rw] whole_page
#   @return [Array, nil]
PaginatedAnimeListListMatch = Struct.new(
  :aired,
  :cover,
  :current_page,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  :whole_page,
  keyword_init: true
)

# Rating entity data model.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
Rating = Struct.new(
  :aired,
  :cover,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  keyword_init: true
)

# Request payload for Rating#list.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
RatingListMatch = Struct.new(
  :aired,
  :cover,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] aired
#   @return [String, nil]
#
# @!attribute [rw] cover
#   @return [String, nil]
#
# @!attribute [rw] descrip_tion
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [String, nil]
#
# @!attribute [rw] ep_count
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_path
#   @return [String, nil]
#
# @!attribute [rw] mal_score
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] premiered
#   @return [String, nil]
#
# @!attribute [rw] ratings_num
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] studio
#   @return [String, nil]
#
# @!attribute [rw] synonym
#   @return [String, nil]
Search = Struct.new(
  :aired,
  :cover,
  :descrip_tion,
  :duration,
  :ep_count,
  :finder,
  :genre,
  :id,
  :image_path,
  :mal_score,
  :name,
  :premiered,
  :ratings_num,
  :status,
  :studio,
  :synonym,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] id
#   @return [String]
SearchLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# StreamingDetail entity data model.
#
# @!attribute [rw] local
#   @return [Hash, nil]
StreamingDetail = Struct.new(
  :local,
  keyword_init: true
)

# Request payload for StreamingDetail#load.
#
# @!attribute [rw] id
#   @return [Integer]
StreamingDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

