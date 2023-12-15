class ContentArtist < ApplicationRecord
    belongs_to :user
    has_many :songs, dependent: :destroy
    has_many :albums
  
    validates_presence_of :name, :image, :description, :genre, :user_id
    validates :description, length: { minimum: 0 }
    validates :image, presence: true, unless: -> { ENV['RAILS_ENV'] == 'test' }

  end
  