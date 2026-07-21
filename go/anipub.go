package voxgiganipubsdk

import (
	"github.com/voxgig-sdk/anipub-sdk/go/core"
	"github.com/voxgig-sdk/anipub-sdk/go/entity"
	"github.com/voxgig-sdk/anipub-sdk/go/feature"
	_ "github.com/voxgig-sdk/anipub-sdk/go/utility"
)

// Type aliases preserve external API.
type AnipubSDK = core.AnipubSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AnipubEntity = core.AnipubEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AnipubError = core.AnipubError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAnimeEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewAnimeEntity(client, entopts)
	}
	core.NewFindEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewFindEntity(client, entopts)
	}
	core.NewFullAnimeDetailEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewFullAnimeDetailEntity(client, entopts)
	}
	core.NewInfoEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewInfoEntity(client, entopts)
	}
	core.NewPaginatedAnimeListEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewPaginatedAnimeListEntity(client, entopts)
	}
	core.NewRatingEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewRatingEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewStreamingDetailEntityFunc = func(client *core.AnipubSDK, entopts map[string]any) core.AnipubEntity {
		return entity.NewStreamingDetailEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAnipubSDK = core.NewAnipubSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAnipubSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AnipubSDK  { return NewAnipubSDK(nil) }
func Test() *AnipubSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
