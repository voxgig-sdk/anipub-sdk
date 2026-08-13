# Find entity test

require "minitest/autorun"
require "json"
require_relative "../Anipub_sdk"
require_relative "runner"

class FindEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AnipubSDK.test(nil, nil)
    ent = testsdk.Find(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = find_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "find." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ANIPUB_TEST_FIND_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    find_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.find")))
    find_ref01_data = nil
    if find_ref01_data_raw.length > 0
      find_ref01_data = Helpers.to_map(find_ref01_data_raw[0][1])
    end

    # LOAD
    find_ref01_ent = client.Find(nil)
    find_ref01_match_dt0 = {
      "id" => find_ref01_data["id"],
    }
    find_ref01_data_dt0_loaded = find_ref01_ent.load(find_ref01_match_dt0, nil)
    find_ref01_data_dt0_load_result = Helpers.to_map(find_ref01_data_dt0_loaded.respond_to?(:data_get) ? find_ref01_data_dt0_loaded.data_get : find_ref01_data_dt0_loaded)
    assert !find_ref01_data_dt0_load_result.nil?
    assert_equal find_ref01_data_dt0_load_result["id"], find_ref01_data["id"]

  end
end

def find_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "find", "FindTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AnipubSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["find01", "find02", "find03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["ANIPUB_TEST_FIND_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ANIPUB_TEST_FIND_ENTID" => idmap,
    "ANIPUB_TEST_LIVE" => "FALSE",
    "ANIPUB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ANIPUB_TEST_FIND_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ANIPUB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = AnipubSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ANIPUB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ANIPUB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
