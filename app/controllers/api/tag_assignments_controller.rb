class Api::TagAssignmentsController < ApplicationController
  before_action :require_signed_in!
  before_action :correct_user, only: [:destroy]

  def index
    @note = Note.find(params[:note_id])
    if @note
      render json: @note.tags
    else
      render text: "Note not found", status: 404
    end
  end

  def create
    @tag_assignment = TagAssignment.new(tag_assignment_params)
    if @tag_assignment.save
      render json: @tag_assignment
    else
      render json: @tag_assignment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @tag_assignment.destroy
    render text: "Tag assignment successfully destroyed", status: 200
  end

  private
  def tag_assignment_params
    params.require(:tag_assignment).permit(:note_id, :tag_id)
  end

  def correct_user
    @tag_assignment = current_user.tag_assignments.find(params[:id])
    if @tag_assignment.nil?
      render text: "Can only remove your tags", status: 404
    end
  end
end
