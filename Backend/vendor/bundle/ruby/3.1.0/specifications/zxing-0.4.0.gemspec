# -*- encoding: utf-8 -*-
# stub: zxing 0.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "zxing".freeze
  s.version = "0.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["ecin".freeze, "Joshua Davey".freeze]
  s.date = "2014-12-17"
  s.description = "Need to decode 1D/2D bars and don't mind using JRuby to help with the task? ZXing is the wrapper for you!".freeze
  s.email = ["ecin@copypastel.com".freeze, "josh@joshuadavey.com".freeze]
  s.executables = ["zxing".freeze]
  s.files = ["bin/zxing".freeze]
  s.homepage = "http://github.com/ecin/zxing.rb".freeze
  s.rubygems_version = "3.3.26".freeze
  s.summary = "JRuby wrapper for ZXing 1D/2D barcode image processing library.".freeze

  s.installed_by_version = "3.3.26" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<jruby-jars>.freeze, [">= 0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 2.5.0"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 0.9.2"])
  else
    s.add_dependency(%q<jruby-jars>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 2.5.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 0.9.2"])
  end
end
