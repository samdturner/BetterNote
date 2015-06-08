class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @note = Note.find_by(id: params[:id])
    if @note.update_attributes(note_params)
      render json: @note
    else
      render json: @note.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @notes = Note.created_date(params[:sort_col], params[:asc_desc],
                               params[:start_row])
    render json: @notes
  end

  private
  def note_params
    params.require(:note).permit(:user_id, :notebook_id, :title,
                                 :content, :sort_col, :asec_desc,
                                 :start_row)
  end
end
