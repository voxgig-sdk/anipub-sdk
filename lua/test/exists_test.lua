-- Anipub SDK exists test

local sdk = require("anipub_sdk")

describe("AnipubSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
