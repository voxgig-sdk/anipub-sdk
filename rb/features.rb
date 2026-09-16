# Anipub SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AnipubFeatures
  def self.make_feature(name)
    case name
    when "base"
      AnipubBaseFeature.new
    when "ratelimit"
      AnipubRatelimitFeature.new
    when "retry"
      AnipubRetryFeature.new
    when "test"
      AnipubTestFeature.new
    when "timeout"
      AnipubTimeoutFeature.new
    else
      AnipubBaseFeature.new
    end
  end
end
