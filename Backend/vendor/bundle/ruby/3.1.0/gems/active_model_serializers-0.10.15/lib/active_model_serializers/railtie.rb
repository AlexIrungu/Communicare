# frozen_string_literal: true

require 'rails/railtie'
require 'action_controller'
require 'action_controller/railtie'
require 'action_controller/serialization'

module ActiveModelSerializers
  class Railtie < Rails::Railtie
    config.eager_load_namespaces << ActiveModelSerializers

    config.to_prepare do
      ActiveModel::Serializer.serializers_cache.clear
    end

    initializer 'active_model_serializers.action_controller' do
      ActiveSupport.on_load(:action_controller) do
        include(::ActionController::Serialization)
      end
    end

    initializer 'active_model_serializers.prepare_serialization_context' do
      SerializationContext.url_helpers = Rails.application.routes.url_helpers
      SerializationContext.default_url_options = Rails.application.routes.default_url_options
    end

    # This hook is run after the action_controller railtie has set the configuration
    # based on the *environment* configuration and before any config/initializers are run
    # and also before eager_loading (if enabled).
    initializer 'active_model_serializers.set_configs', after: 'action_controller.set_configs' do
      ActiveModelSerializers.logger = Rails.configuration.action_controller.logger
      ActiveModelSerializers.config.perform_caching = Rails.configuration.action_controller.perform_caching
      # We want this hook to run after the config has been set, even if ActionController has already loaded.
      ActiveSupport.on_load(:action_controller) do
        ActiveModelSerializers.config.cache_store = ActionController::Base.cache_store
      end
    end

    # :nocov:
    generators do |app|
      Rails::Generators.configure!(app.config.generators)
      Rails::Generators.hidden_namespaces.uniq!
      require 'generators/rails/resource_override'
    end
    # :nocov:

    def extend_action_controller_test_case(&block)
      if Rails::VERSION::MAJOR >= 6 || Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR >= 2
        ActiveSupport.on_load(:action_controller_test_case, run_once: true, &block)
      else
        ActionController::TestCase.instance_eval(&block)
      end
    end

    if Rails.env.test?
      extend_action_controller_test_case do
        include ActiveModelSerializers::Test::Schema
        include ActiveModelSerializers::Test::Serializer
      end
    end
  end
end
