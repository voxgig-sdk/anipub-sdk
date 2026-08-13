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
# @!attribute [rw] Genre
#   @return [Object]
#
# @!attribute [rw] Name
#   @return [String]
#
# @!attribute [rw] exists
#   @return [Boolean, nil]
Anime = Struct.new(
  :Genre,
  :Name,
  :exists,
  keyword_init: true
)

# Request payload for Anime#load.
#
# @!attribute [rw] Genre
#   @return [Object, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] exists
#   @return [Boolean, nil]
AnimeLoadMatch = Struct.new(
  :Genre,
  :Name,
  :exists,
  keyword_init: true
)

# Request payload for Anime#create.
#
# @!attribute [rw] Genre
#   @return [Object]
#
# @!attribute [rw] Name
#   @return [String]
#
# @!attribute [rw] exists
#   @return [Boolean, nil]
AnimeCreateData = Struct.new(
  :Genre,
  :Name,
  :exists,
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
# @!attribute [rw] characters
#   @return [Array, nil]
#
# @!attribute [rw] jikan
#   @return [Hash, nil]
#
# @!attribute [rw] local
#   @return [Hash, nil]
FullAnimeDetail = Struct.new(
  :characters,
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
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
Info = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :epCount,
  :finder,
  :id,
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
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] currentPage
#   @return [Integer, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] wholePage
#   @return [Array, nil]
PaginatedAnimeList = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :currentPage,
  :epCount,
  :finder,
  :id,
  :wholePage,
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
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] currentPage
#   @return [Integer, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] wholePage
#   @return [Array, nil]
PaginatedAnimeListListMatch = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :currentPage,
  :epCount,
  :finder,
  :id,
  :wholePage,
  keyword_init: true
)

# Rating entity data model.
#
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
Rating = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :epCount,
  :finder,
  :id,
  keyword_init: true
)

# Request payload for Rating#list.
#
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
RatingListMatch = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :epCount,
  :finder,
  :id,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] Aired
#   @return [String, nil]
#
# @!attribute [rw] Cover
#   @return [String, nil]
#
# @!attribute [rw] DescripTion
#   @return [String, nil]
#
# @!attribute [rw] Duration
#   @return [String, nil]
#
# @!attribute [rw] Genres
#   @return [Array, nil]
#
# @!attribute [rw] ImagePath
#   @return [String, nil]
#
# @!attribute [rw] MALScore
#   @return [String, nil]
#
# @!attribute [rw] Name
#   @return [String, nil]
#
# @!attribute [rw] Premiered
#   @return [String, nil]
#
# @!attribute [rw] RatingsNum
#   @return [Integer, nil]
#
# @!attribute [rw] Status
#   @return [String, nil]
#
# @!attribute [rw] Studios
#   @return [String, nil]
#
# @!attribute [rw] Synonyms
#   @return [String, nil]
#
# @!attribute [rw] epCount
#   @return [Integer, nil]
#
# @!attribute [rw] finder
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
Search = Struct.new(
  :Aired,
  :Cover,
  :DescripTion,
  :Duration,
  :Genres,
  :ImagePath,
  :MALScore,
  :Name,
  :Premiered,
  :RatingsNum,
  :Status,
  :Studios,
  :Synonyms,
  :epCount,
  :finder,
  :id,
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
# @!attribute [rw] ep
#   @return [Array, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
StreamingDetail = Struct.new(
  :ep,
  :link,
  :name,
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

