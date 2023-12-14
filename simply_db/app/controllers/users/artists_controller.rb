class Users::ArtistsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, only: [:create]

  def index
    @artists = Artist.includes(:user).all
    render json: @artists.to_json(include: :user)
  end

  def show
    @artist = Artist.find_by(id: params[:id])
    render json: @artist
  end

  def create
    @artist = Artist.new(artist_params)

    if @artist.save
      render json: @artist, status: :created
    else
      render json: @artist.errors, status: :unprocessable_entity
    end
  end
  private

  def artist_params
    params.require(:artist).permit(
      :name_artist, 
      :email, 
      :password, 
      :password_confirmation, 
      :social, 
      :description_artist, 
      :tags, 
      :mp3_file,
      :user_id
    )
  end
end
