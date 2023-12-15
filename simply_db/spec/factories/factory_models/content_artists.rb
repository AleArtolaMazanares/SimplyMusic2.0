FactoryBot.define do
  factory :content_artist do
    name { Faker::Music.band }
    description { Faker::Lorem.paragraph }
    genre { Faker::Music.genre }
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec', 'support', 'sample_image.jpg'), 'image/jpeg') }
    # Resto de los atributos
  end
end

