RSpec.describe Feed, type: :model do
  
    it "is invalid without content" do
      feed = FactoryBot.build(:feed, content: nil)
      expect(feed).to_not be_valid
    end
  
    it "is invalid without a date" do
      feed = FactoryBot.build(:feed, date: nil)
      expect(feed).to_not be_valid
    end
  
    it "is invalid without a user_id" do
      feed = FactoryBot.build(:feed, user_id: nil)
      expect(feed).to_not be_valid
    end
  end