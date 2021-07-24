module Errors
  class RenderError
    def self.json(error, status, message)
      {
        status: status,
        error: error,
        message: message
      }.as_json
    end
  end
end