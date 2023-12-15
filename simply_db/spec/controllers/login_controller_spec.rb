RSpec.describe Users::LoginController, type: :controller do
    describe 'POST #create' do
    include Devise::Test::ControllerHelpers # Agrega esto para incluir los helpers de Devise
      let!(:user) { create(:user, email: 'test@example.com', password: 'password123') }
  
      context 'with valid credentials' do
        it 'logs in the user' do
          post :create, params: { login: { email: 'test@example.com', password: 'password123' } }
          expect(response).to have_http_status(:success)
          expect(JSON.parse(response.body)['status']).to eq('success')
        end
      end
  
      context 'with invalid credentials' do
        it 'returns unauthorized status' do
          post :create, params: { login: { email: 'wrong@example.com', password: 'invalidpassword' } }
          expect(response).to have_http_status(:unauthorized)
          expect(JSON.parse(response.body)['status']).to eq('unauthorized')
          expect(JSON.parse(response.body)['error']).to eq('Invalid credentials')
        end
      end
    end
    end
