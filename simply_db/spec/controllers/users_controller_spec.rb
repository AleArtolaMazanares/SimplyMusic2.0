require 'rails_helper'

RSpec.describe Users::UsersController, type: :controller do
  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end

    it 'assigns @users' do
      user = FactoryBot.create(:user)
      get :index
      expect(assigns(:users)).to eq([user])
    end
  end

  describe 'GET #show' do
    it 'returns a successful response' do
      user = FactoryBot.create(:user)
      get :show, params: { id: user.id }
      expect(response).to be_successful
    end

    it 'assigns @user' do
      user = FactoryBot.create(:user)
      get :show, params: { id: user.id }
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      let(:valid_attributes) do
        { name_users: 'John Doe', email: 'john@example.com', password: 'password', password_confirmation: 'password' }
      end

      it 'creates a new user' do
        expect {
          post :create, params: { users: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it 'returns a success response' do
        post :create, params: { users: valid_attributes }
        expect(response).to be_successful
      end
    end

    context 'with invalid params' do
      let(:invalid_attributes) do
        { name_users: 'John Doe', email: '', password: 'password', password_confirmation: 'password' }
      end

      it 'does not create a new user' do
        expect {
          post :create, params: { users: invalid_attributes }
        }.to_not change(User, :count)
      end

      it 'returns an unprocessable entity status' do
        post :create, params: { users: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  # Similar tests for update, destroy, and search actions can be added here

end