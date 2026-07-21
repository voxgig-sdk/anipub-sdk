package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnimeEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewFindEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewFullAnimeDetailEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewInfoEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewPaginatedAnimeListEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewRatingEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewSearchEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

var NewStreamingDetailEntityFunc func(client *AnipubSDK, entopts map[string]any) AnipubEntity

