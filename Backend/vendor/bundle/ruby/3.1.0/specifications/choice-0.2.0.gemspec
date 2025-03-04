# -*- encoding: utf-8 -*-
# stub: choice 0.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "choice".freeze
  s.version = "0.2.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Grant Austin".freeze, "Chris Wanstrath".freeze]
  s.date = "2014-12-31"
  s.description = "Choice is a simple little gem for easily defining and parsing command line options with a friendly DSL.".freeze
  s.email = ["gaustin@gmail.com".freeze, "chris@ozmm.org".freeze]
  s.homepage = "http://www.github.com/defunkt/choice".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.4.5".freeze
  s.summary = "Choice is a command line option parser.".freeze

  s.installed_by_version = "3.6.3".freeze

  s.specification_version = 4

  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.7".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 10.0".freeze])
  s.add_development_dependency(%q<test-unit>.freeze, ["~> 3.0".freeze])
end
