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

  def get_ids_by_user
    user_id = params[:user_id]
    artist = Artist.where(user_id: user_id).pluck(:name_artist, :form_submitted)
    
    # Construir un hash con las claves name y form_submitted
    artist = artist.map do |name_artist, form_submitted|
      { name_artist: name_artist, form_submitted: form_submitted }
    end
    
    render json: artist
  end

  def create
    @artist = Artist.new(artist_params)

    @artist.form_submitted = true

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
