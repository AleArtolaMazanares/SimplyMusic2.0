require 'rails_helper'
require 'faker'

RSpec.describe ContentArtist, type: :model do
  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:image) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:genre) }
    it { should validate_presence_of(:user_id) }
    it { should validate_length_of(:description).is_at_least(0) }
  end
end