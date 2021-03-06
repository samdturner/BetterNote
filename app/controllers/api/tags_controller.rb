class Api::TagsController < ApplicationController
  before_action :require_signed_in!
  before_action :correct_user, only: [:destroy, :show]

  def index
    if params[:note_id]
      @note = Note.find(params[:note_id])
      if current_user.id != @note.user_id
        render text: "Can only view tags for your own notes", status: 404
      else
        render json: @note.tags
      end
    else
      render json: current_user.tags
    end
  end

  def create
    @tag = Tag.find_by_name(params[:name])
    if @tag
      render json: @tag
    else
      @tag = Tag.new(tag_params)
      @tag.user_id = current_user.id
      if @tag.save
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unprocessable_entity
      end
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
    @tag = current_user.tags.find(params[:id])
    if @tag.nil?
      render text: "Can only delete your tags", status: 404
    end
  end
end
