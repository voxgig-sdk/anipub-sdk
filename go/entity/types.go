// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Anime is the typed data model for the anime entity.
type Anime struct {
	Exist *bool `json:"exist,omitempty"`
	Genre any `json:"genre"`
	Name string `json:"name"`
}

// AnimeLoadMatch is the typed request payload for Anime.LoadTyped.
type AnimeLoadMatch struct {
	Exist *bool `json:"exist,omitempty"`
	Genre *any `json:"genre,omitempty"`
	Name *string `json:"name,omitempty"`
}

// AnimeCreateData is the typed request payload for Anime.CreateTyped.
type AnimeCreateData struct {
	Exist *bool `json:"exist,omitempty"`
	Genre any `json:"genre"`
	Name string `json:"name"`
}

// Find is the typed data model for the find entity.
type Find struct {
	Ep *int `json:"ep,omitempty"`
	Exist bool `json:"exist"`
	Id *int `json:"id,omitempty"`
}

// FindLoadMatch is the typed request payload for Find.LoadTyped.
type FindLoadMatch struct {
	Id string `json:"id"`
}

// FullAnimeDetail is the typed data model for the full_anime_detail entity.
type FullAnimeDetail struct {
	Character *[]any `json:"character,omitempty"`
	Jikan *map[string]any `json:"jikan,omitempty"`
	Local *map[string]any `json:"local,omitempty"`
}

// FullAnimeDetailLoadMatch is the typed request payload for FullAnimeDetail.LoadTyped.
type FullAnimeDetailLoadMatch struct {
	Id int `json:"id"`
}

// Info is the typed data model for the info entity.
type Info struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
}

// InfoLoadMatch is the typed request payload for Info.LoadTyped.
type InfoLoadMatch struct {
	Id string `json:"id"`
}

// PaginatedAnimeList is the typed data model for the paginated_anime_list entity.
type PaginatedAnimeList struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	CurrentPage *int `json:"current_page,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
	WholePage *[]any `json:"whole_page,omitempty"`
}

// PaginatedAnimeListLoadMatch is the typed request payload for PaginatedAnimeList.LoadTyped.
type PaginatedAnimeListLoadMatch struct {
	Genre *string `json:"genre,omitempty"`
	Name *string `json:"name,omitempty"`
}

// PaginatedAnimeListListMatch is the typed request payload for PaginatedAnimeList.ListTyped.
type PaginatedAnimeListListMatch struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	CurrentPage *int `json:"current_page,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
	WholePage *[]any `json:"whole_page,omitempty"`
}

// Rating is the typed data model for the rating entity.
type Rating struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
}

// RatingListMatch is the typed request payload for Rating.ListTyped.
type RatingListMatch struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Aired *string `json:"aired,omitempty"`
	Cover *string `json:"cover,omitempty"`
	DescripTion *string `json:"descrip_tion,omitempty"`
	Duration *string `json:"duration,omitempty"`
	EpCount *int `json:"ep_count,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Genre *[]any `json:"genre,omitempty"`
	Id *int `json:"id,omitempty"`
	ImagePath *string `json:"image_path,omitempty"`
	MalScore *string `json:"mal_score,omitempty"`
	Name *string `json:"name,omitempty"`
	Premiered *string `json:"premiered,omitempty"`
	RatingsNum *int `json:"ratings_num,omitempty"`
	Status *string `json:"status,omitempty"`
	Studio *string `json:"studio,omitempty"`
	Synonym *string `json:"synonym,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Id string `json:"id"`
}

// StreamingDetail is the typed data model for the streaming_detail entity.
type StreamingDetail struct {
	Local *map[string]any `json:"local,omitempty"`
}

// StreamingDetailLoadMatch is the typed request payload for StreamingDetail.LoadTyped.
type StreamingDetailLoadMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
