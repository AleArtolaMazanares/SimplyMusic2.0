FactoryBot.define do
  factory :song do
    title_song { Faker::Music.album }
    song_file { 'song.mp3' }
    genre { Faker::Music.genre }
    song_duration { '3:30' }
    content_artist_id { 1 } # Puedes ajustar este valor según sea necesario
    image { 'song.jpg' }
    association :user, factory: :user # Asumiendo que tienes un factory para User
  end
end