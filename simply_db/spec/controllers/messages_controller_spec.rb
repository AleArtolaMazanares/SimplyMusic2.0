RSpec.describe Users::MessagesController, type: :controller do
    describe 'GET #index' do
      it 'returns a success response' do
        get :index
        expect(response).to be_successful
      end
    end
  
    describe 'POST #create' do
      let(:valid_message_params) { { message: attributes_for(:message) } }
      
      it 'creates a new message' do
        expect {
          post :create, params: valid_message_params
        }.to change(Message, :count).by(1)
      end
  
      it 'returns the newly created message' do
        post :create, params: valid_message_params
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to include('message_content' => valid_message_params[:message][:message_content])
      end
    end
  
    describe 'GET #get_messages_by_artist' do
      let(:content_artist) { create(:content_artist) }
      let!(:message) { create(:message, content_artist_id: content_artist.id) }
  
      it 'returns messages by content_artist_id' do
        get :get_messages_by_artist, params: { content_artist_id: content_artist.id }
        expect(JSON.parse(response.body).count).to eq(1)
      end
    end
  
    describe 'PUT #like' do
      let!(:message) { create(:message) }
  
    end
  end
  