FactoryBot.define do
  factory :feed do
    content { Faker::Lorem.sentence }
    date { Faker::Time.between(from: DateTime.now - 14, to: DateTime.now) }
    association :user, factory: :user



    trait :with_specific_content do
      content { "Specific content for testing purposes" }
    end
  end
end
