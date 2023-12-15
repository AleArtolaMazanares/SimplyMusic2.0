FactoryBot.define do
  factory :feed do
    content { Faker::Lorem.sentence }
    date { Faker::Date.backward(days: 14) }
    association :user, factory: :user
  end
end