RSpec.describe Users::ContentArtistsController, type: :controller do
    describe "GET #index" do
      it "returns a success response" do
        content_artist = create(:content_artist)
        get :index
        expect(response).to be_successful
        # Aquí puedes verificar otros detalles si es necesario
      end
    end
  
    describe "GET #show" do
      it "returns a success response" do
        content_artist = create(:content_artist)
        get :show, params: { id: content_artist.id }
        expect(response).to be_successful
        # Aquí puedes verificar otros detalles si es necesario
      end
    end
  
    describe 'POST #create' do
    let(:valid_params) { { content_artist: FactoryBot.attributes_for(:content_artist) } }
    let(:invalid_params) { { content_artist: { name: '' } } }

    context 'with valid params' do
      it 'creates a new content artist' do
        expect {
          post :create, params: valid_params
        }.to change(ContentArtist, :count).by(1)
      end

      it 'returns a success response' do
        post :create, params: valid_params
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      it 'does not create a new content artist' do
        expect {
          post :create, params: invalid_params
        }.to_not change(ContentArtist, :count)
      end

      it 'returns an unprocessable entity status' do
        post :create, params: invalid_params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH #update' do
    let(:content_artist) { FactoryBot.create(:content_artist) }

    it 'updates the requested content artist' do
      patch :update, params: { id: content_artist.id, content_artist: { name: 'New Name' } }
      content_artist.reload
      expect(content_artist.name).to eq('New Name')
    end

    it 'returns a success response' do
      patch :update, params: { id: content_artist.id, content_artist: { name: 'New Name' } }
      expect(response).to have_http_status(:ok)
    end

    context 'with invalid params' do
      it 'returns an unprocessable entity status' do
        patch :update, params: { id: content_artist.id, content_artist: { name: '' } }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET #get_ids_by_user' do
    let(:user) { FactoryBot.create(:user) }
    let!(:content_artists) { FactoryBot.create_list(:content_artist, 3, user_id: user.id) }

    it 'returns content artist ids for a given user' do
      get :get_ids_by_user, params: { user_id: user.id }
      expect(JSON.parse(response.body).size).to eq(3)
    end

    it 'returns a success response' do
      get :get_ids_by_user, params: { user_id: user.id }
      expect(response).to have_http_status(:ok)
    end
  end
  end