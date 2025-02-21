FactoryBot.define do
  factory :outbreak_history do
    communicable_disease { nil }
    area { nil }
    cases { 1 }
    outbreak_date { "2025-02-21" }
    severity_level { "MyString" }
    status { "MyString" }
    description { "MyText" }
  end
end
