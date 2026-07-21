# Anipub SDK utility: make_context
require_relative '../core/context'
module AnipubUtilities
  MakeContext = ->(ctxmap, basectx) {
    AnipubContext.new(ctxmap, basectx)
  }
end
