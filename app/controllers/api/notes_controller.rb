class Api::NotesController < ApplicationController
  before_action :require_signed_in!

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    @note.content = @note.content || ""
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @note = Note.find_by(id: params[:id])
    if @note.user_id != current_user.id
      render text: "Can only update your own note", status: :forbidden
    end

    if @note.update_attributes(note_params)
      render json: @note
    else
      render json: @note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    if params[:tag_id]
      @notes = Note.select_by_tag(params[:tag_id], current_user.id,
                                  params[:sort_col], params[:asc_desc],
                                  params[:start_row])
      render json: @notes
    elsif params[:notebook_id]
      @notes = Note.select_by_notebook(current_user.id, params[:sort_col],
                                        params[:asc_desc], params[:start_row],
                                        params[:notebook_id])
      render json: @notes
    elsif params[:sort_col]
      @notes = Note.select_notes(current_user.id, params[:sort_col],
                                  params[:asc_desc], params[:start_row])
      render json: @notes
    elsif params[:substr]
      @notes = Note.where("user_id = ?", current_user.id)
      render json: @notes.select { |note| note.contains_substr?(params[:substr]) }
    end
  end

  private
  def note_params
    params.require(:note).permit(:user_id, :notebook_id, :title,
                                 :content, :sort_col, :asec_desc,
                                 :start_row)
  end
end
