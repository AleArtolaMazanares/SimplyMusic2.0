FactoryBot.define do
    factory :message do
      message_content { Faker::Lorem.sentence }
      sent_hour { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
      content_artist_id { FactoryBot.create(:content_artist).id }
      # Si hay más campos en tu modelo, agrégalos aquí
    end
  end
  