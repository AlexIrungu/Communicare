# config/initializers/rack_attack.rb
class Rack::Attack
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
    
    # Limit requests to 300 per 5 minutes per IP
    throttle('req/ip', limit: 300, period: 5.minutes) do |req|
      req.ip
    end
  end