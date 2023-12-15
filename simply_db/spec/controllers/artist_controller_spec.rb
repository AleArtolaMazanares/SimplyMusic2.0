require 'rails_helper'

RSpec.describe Users::ArtistsController, type: :controller do
  let(:valid_attributes) do
    {
      name_artist: 'Artist Name',
      email: 'artist@example.com',
      password: 'password',
      password_confirmation: 'password',
      social: 'Social Media Link',
      description_artist: 'Artist Description',
      tags: 'Artist Tags',
      mp3_file: 'path/to/mp3_file.mp3',
      user_id: user.id # Assuming user is authenticated
    }
  end

  let(:invalid_attributes) do
    {
      # Invalid attributes without required fields
      name_artist: 'Artist Name'
      # ... other fields except the required ones
    }
  end
  end

  describe 'POST #create' do
    before do
      # Simulate authentication through Devise
      @request.env['devise.mapping'] = Devise.mappings[:user]
      user = FactoryBot.create(:user)
      sign_in user
    end
    end

  

    
