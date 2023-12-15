# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  describe "validations" do
    it { should validate_presence_of(:name_users) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:password_confirmation) }
    # Add other validations here
  end

  describe "associations" do
    it { should have_many(:artists) }
    # Add other associations here
  end

  # Add tests for other methods in the User model here
end