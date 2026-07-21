# Anipub SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AnipubFeatures
  def self.make_feature(name)
    case name
    when "base"
      AnipubBaseFeature.new
    when "test"
      AnipubTestFeature.new
    else
      AnipubBaseFeature.new
    end
  end
end
