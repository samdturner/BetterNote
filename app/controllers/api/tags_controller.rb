class Api::TagsController < ApplicationController
  before_action :require_signed_in!
  before_action :correct_user

  def index
    render json: current_user.tags
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      render json: @tag
    else
      render json: @tag.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: current_user.tags.find(params[:id])
  end

  def destroy
    @tag.destroy
    render text: "Tag successfully destroyed", status: 200
  end

  private
  def tag_params
    params.require(:tag).permit(:name)
  end

  def correct_user
    @tag = current_user.tag.find(params[:id])
    if @tag.nil?
      render text: "Can only delete your tags", status: 404
    end
  end
end
