# Anipub SDK exists test

require "minitest/autorun"
require_relative "../Anipub_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AnipubSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
