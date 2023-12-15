require 'rails_helper'

RSpec.describe Users::SongsController, type: :controller do

    context 'with invalid parameters' do
      it 'does not create a new song' do
        expect {
          post :create, params: { song: { title_song: nil, song_file: nil, genre: nil, song_duration: nil, content_artist_id: nil, image: nil } }
        }.to_not change(Song, :count)
        
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end




  # Add tests for other actions like get_songs_by_content_artist, get_songs_by_id, search, etc
