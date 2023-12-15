# spec/models/artist_spec.rb
require 'rails_helper'

RSpec.describe Artist, type: :model do
  subject { build(:artist) }

  describe "validations" do
    it { should validate_presence_of(:name_artist) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    # Add other validations here
  end

  # Add tests for other methods in the Artist model here
end