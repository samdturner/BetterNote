class Api::TagsController < ApplicationController
  before_action :require_signed_in!

  def index
    if current_user.nil?
      render text: "You must be logged in to view tags", status: :forbidden
    end

    @tags = current_user.tags

    render json: @tags
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end
end
