# Create this file at config/initializers/jwt.rb

require 'jwt'

module JWT
  class << self
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, ENV['DEVISE_JWT_SECRET_KEY'])
    end

    def decode(token)
      decoded = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'])[0]
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError, JWT::ExpiredSignature, JWT::VerificationError => e
      Rails.logger.error "JWT Error: #{e.message}"
      nil
    end
  end
end