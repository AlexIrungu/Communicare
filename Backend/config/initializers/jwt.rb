# config/initializers/jwt.rb
require 'jwt'

module JWT
  class << self
    # Store a reference to the original encode method
    alias_method :original_encode, :encode
    
    def encode(payload, key = ENV['DEVISE_JWT_SECRET_KEY'], algorithm = 'HS256')
      # If called with our custom format, handle expiration
      if key.is_a?(Time) || key.is_a?(ActiveSupport::Duration)
        exp = key
        payload = payload.dup
        payload[:exp] = exp.to_i
        return original_encode(payload, ENV['DEVISE_JWT_SECRET_KEY'], algorithm)
      end
      
      # Otherwise call original method
      original_encode(payload, key, algorithm)
    end
    
    # Keep your decode method as is
    alias_method :original_decode, :decode
    
    def decode(token, key = ENV['DEVISE_JWT_SECRET_KEY'], verify = true, options = {})
      # Use original_decode to avoid recursion
      decoded = original_decode(token, key, verify, options)[0]
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError => e
      Rails.logger.error "JWT Error: #{e.message}"
      nil
    end
  end
end