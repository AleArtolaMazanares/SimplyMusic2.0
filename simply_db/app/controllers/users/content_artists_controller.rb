class Users::ContentArtistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index 
    @content = ContentArtist.all
    render json: @content
  end

  def show
    @content = ContentArtist.find_by(id: params[:id])
    render json: @content
  end

  def create
    @content_artist = ContentArtist.new(content_artist_params)

    # Establecer el valor de form_submitted
    @content_artist.form_submitted = true

    if @content_artist.save
      render json: @content_artist, status: :created
    else
      render json: @content_artist.errors, status: :unprocessable_entity
    end
  end

  def update
    @content_artist = ContentArtist.find_by(id: params[:id])

    if @content_artist.update(content_artist_params)
      render json: @content_artist
    else
      render json: @content_artist.errors, status: :unprocessable_entity
    end
  end

  def get_ids_by_user
    user_id = params[:user_id]
    content_artists = ContentArtist.where(user_id: user_id).pluck(:name, :form_submitted, :id)
  
    # Construir un hash con las claves name y form_submitted
    content_artist_data = content_artists.map do |name, form_submitted, id|
      { name: name, form_submitted: form_submitted, id: id, }
    end
  
    render json: content_artist_data
  end



3
  private

  def content_artist_params
    params.require(:content_artist).permit(:name, :image, :description, :genre, :user_id)
  end
end
