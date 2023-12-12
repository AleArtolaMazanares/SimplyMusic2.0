class Users::FeedsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_feed, only: [:edit, :update, :destroy]

  # GET /feeds
  def index
    @feeds = Feed.all
    render json: @feeds
  end

  # GET /feeds/1
  def show
    @feed = Feed.find(params[:id])
    render json: @feed
  end

  # GET /feeds/new
  def new
    @feed = Feed.new
  end

  # GET /feeds/1/edit
  def edit
  end

  # GET /feeds_for_user/:user_id
  def feeds_for_user
    user_id = params[:user_id]
    feeds_for_user = Feed.where(user_id: user_id).as_json(only: [:id, :date, :content])
  
    render json: feeds_for_user
  end
  
  

  # POST /feeds
  def create
    existing_comment = Feed.find_by(user_id: params[:user_id], content: params[:feed][:content])
  
    if existing_comment
      render json: { error: "No puedes publicar el mismo comentario nuevamente." }, status: :unprocessable_entity
    else
      @feed = Feed.new(feed_params)
  
      if @feed.save
        render json: @feed, status: :created
      else
        render json: { errors: @feed.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end
  

  # PATCH/PUT /feeds/1
  def update
    if @feed.update(feed_params)
      render json: @feed
    else
      render json: :unprocessable_entity
    end
  end

  # DELETE /feeds/1
  def destroy
    @feed.destroy
    render json: @feed
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_feed
    @feed = Feed.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def feed_params
    params.require(:feed).permit(:content, :date, :user_id)
  end
end
