// Typed models for the Anipub SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/anipub-sdk/go/core"
)

// Anime is the typed data model for the anime entity.
type Anime struct {
	Genre any `json:"Genre"`
	Name string `json:"Name"`
	Exists *bool `json:"exists,omitempty"`
}

// AnimeLoadMatch is the typed request payload for Anime.LoadTyped.
type AnimeLoadMatch struct {
	Genre *any `json:"Genre,omitempty"`
	Name *string `json:"Name,omitempty"`
	Exists *bool `json:"exists,omitempty"`
}

// AnimeCreateData is the typed request payload for Anime.CreateTyped.
type AnimeCreateData struct {
	Genre any `json:"Genre"`
	Name string `json:"Name"`
	Exists *bool `json:"exists,omitempty"`
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
	Characters *[]any `json:"characters,omitempty"`
	Jikan *map[string]any `json:"jikan,omitempty"`
	Local *map[string]any `json:"local,omitempty"`
}

// FullAnimeDetailLoadMatch is the typed request payload for FullAnimeDetail.LoadTyped.
type FullAnimeDetailLoadMatch struct {
	Id int `json:"id"`
}

// Info is the typed data model for the info entity.
type Info struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
}

// InfoLoadMatch is the typed request payload for Info.LoadTyped.
type InfoLoadMatch struct {
	Id string `json:"id"`
}

// PaginatedAnimeList is the typed data model for the paginated_anime_list entity.
type PaginatedAnimeList struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	CurrentPage *int `json:"currentPage,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
	WholePage *[]any `json:"wholePage,omitempty"`
}

// PaginatedAnimeListLoadMatch is the typed request payload for PaginatedAnimeList.LoadTyped.
type PaginatedAnimeListLoadMatch struct {
	Genre *string `json:"genre,omitempty"`
	Name *string `json:"name,omitempty"`
}

// PaginatedAnimeListListMatch is the typed request payload for PaginatedAnimeList.ListTyped.
type PaginatedAnimeListListMatch struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	CurrentPage *int `json:"currentPage,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
	WholePage *[]any `json:"wholePage,omitempty"`
}

// Rating is the typed data model for the rating entity.
type Rating struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
}

// RatingListMatch is the typed request payload for Rating.ListTyped.
type RatingListMatch struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Aired *string `json:"Aired,omitempty"`
	Cover *string `json:"Cover,omitempty"`
	DescripTion *string `json:"DescripTion,omitempty"`
	Duration *string `json:"Duration,omitempty"`
	Genres *[]any `json:"Genres,omitempty"`
	ImagePath *string `json:"ImagePath,omitempty"`
	MALScore *string `json:"MALScore,omitempty"`
	Name *string `json:"Name,omitempty"`
	Premiered *string `json:"Premiered,omitempty"`
	RatingsNum *int `json:"RatingsNum,omitempty"`
	Status *string `json:"Status,omitempty"`
	Studios *string `json:"Studios,omitempty"`
	Synonyms *string `json:"Synonyms,omitempty"`
	EpCount *int `json:"epCount,omitempty"`
	Finder *string `json:"finder,omitempty"`
	Id *int `json:"id,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Id string `json:"id"`
}

// StreamingDetail is the typed data model for the streaming_detail entity.
type StreamingDetail struct {
	Ep *[]any `json:"ep,omitempty"`
	Link *string `json:"link,omitempty"`
	Name *string `json:"name,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
