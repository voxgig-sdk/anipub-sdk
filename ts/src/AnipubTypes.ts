// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Anime {
  Genre: any
  Name: string
  exists?: boolean
}

export interface AnimeLoadMatch {
  Genre?: any
  Name?: string
  exists?: boolean
}

export interface AnimeCreateData {
  Genre: any
  Name: string
  exists?: boolean
}

export interface Find {
  ep?: number
  exist: boolean
  id?: number
}

export interface FindLoadMatch {
  id: string
}

export interface FullAnimeDetail {
  characters?: any[]
  jikan?: Record<string, any>
  local?: Record<string, any>
}

export interface FullAnimeDetailLoadMatch {
  id: number
}

export interface Info {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  epCount?: number
  finder?: string
  id?: number
}

export interface InfoLoadMatch {
  id: string
}

export interface PaginatedAnimeList {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  currentPage?: number
  epCount?: number
  finder?: string
  id?: number
  wholePage?: any[]
}

export interface PaginatedAnimeListLoadMatch {
  genre?: string
  name?: string
}

export interface PaginatedAnimeListListMatch {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  currentPage?: number
  epCount?: number
  finder?: string
  id?: number
  wholePage?: any[]
}

export interface Rating {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  epCount?: number
  finder?: string
  id?: number
}

export interface RatingListMatch {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  epCount?: number
  finder?: string
  id?: number
}

export interface Search {
  Aired?: string
  Cover?: string
  DescripTion?: string
  Duration?: string
  Genres?: any[]
  ImagePath?: string
  MALScore?: string
  Name?: string
  Premiered?: string
  RatingsNum?: number
  Status?: string
  Studios?: string
  Synonyms?: string
  epCount?: number
  finder?: string
  id?: number
}

export interface SearchLoadMatch {
  id: string
}

export interface StreamingDetail {
  ep?: any[]
  link?: string
  name?: string
}

export interface StreamingDetailLoadMatch {
  id: number
}

