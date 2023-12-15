
FactoryBot.define do
  factory :song do
    name { Faker::Music.band }
    description { Faker::Lorem.paragraph }
    genre { Faker::Music.genre }
    association :user, factory: :user # Asumiendo que tienes un factory para User
  end
end