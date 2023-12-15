FactoryBot.define do
  factory :content_artist do
    name { Faker::Music.band }
    description { Faker::Lorem.paragraph }
    genre { Faker::Music.genre }
    image { Faker::LoremFlickr.image(size: "100x100") }
    user_id { FactoryBot.create(:user).id }
    # Resto de los atributos
  end
end

