// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Anime {
  exist?: boolean
  genre: any
  name: string
}

export interface AnimeLoadMatch {
  exist?: boolean
  genre?: any
  name?: string
}

export interface AnimeCreateData {
  exist?: boolean
  genre: any
  name: string
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
  character?: any[]
  jikan?: Record<string, any>
  local?: Record<string, any>
}

export interface FullAnimeDetailLoadMatch {
  id: number
}

export interface Info {
  aired?: string
  cover?: string
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
}

export interface InfoLoadMatch {
  id: string
}

export interface PaginatedAnimeList {
  aired?: string
  cover?: string
  current_page?: number
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
  whole_page?: any[]
}

export interface PaginatedAnimeListLoadMatch {
  genre?: string
  name?: string
}

export interface PaginatedAnimeListListMatch {
  aired?: string
  cover?: string
  current_page?: number
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
  whole_page?: any[]
}

export interface Rating {
  aired?: string
  cover?: string
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
}

export interface RatingListMatch {
  aired?: string
  cover?: string
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
}

export interface Search {
  aired?: string
  cover?: string
  descrip_tion?: string
  duration?: string
  ep_count?: number
  finder?: string
  genre?: any[]
  id?: number
  image_path?: string
  mal_score?: string
  name?: string
  premiered?: string
  ratings_num?: number
  status?: string
  studio?: string
  synonym?: string
}

export interface SearchLoadMatch {
  id: string
}

export interface StreamingDetail {
  local?: Record<string, any>
}

export interface StreamingDetailLoadMatch {
  id: number
}

