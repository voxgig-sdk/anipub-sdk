package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/anipub-sdk/go"
	"github.com/voxgig-sdk/anipub-sdk/go/core"

	vs "github.com/voxgig-sdk/anipub-sdk/go/utility/struct"
)

func TestAnimeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Anime(nil)
		if ent == nil {
			t.Fatal("expected non-nil AnimeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := animeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "anime." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ANIPUB_TEST_ANIME_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		animeRef01Ent := client.Anime(nil)
		animeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "anime"}, setup.data), "anime_ref01"))

		animeRef01DataResult, err := animeRef01Ent.Create(animeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		animeRef01Data = core.ToMapAny(animeRef01DataResult)
		if animeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		animeRef01MatchDt0 := map[string]any{}
		animeRef01DataDt0Loaded, err := animeRef01Ent.Load(animeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if animeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func animeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "anime", "AnimeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read anime test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse anime test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"anime01", "anime02", "anime03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ANIPUB_TEST_ANIME_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ANIPUB_TEST_ANIME_ENTID": idmap,
		"ANIPUB_TEST_LIVE":      "FALSE",
		"ANIPUB_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ANIPUB_TEST_ANIME_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ANIPUB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAnipubSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ANIPUB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ANIPUB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
