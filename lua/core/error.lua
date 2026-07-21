-- Anipub SDK error

local AnipubError = {}
AnipubError.__index = AnipubError


function AnipubError.new(code, msg, ctx)
  local self = setmetatable({}, AnipubError)
  self.is_sdk_error = true
  self.sdk = "Anipub"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AnipubError:error()
  return self.msg
end


function AnipubError:__tostring()
  return self.msg
end


return AnipubError
