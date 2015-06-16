class NotesController < ApplicationController

  def show
    @note = Note.find_by(shared_url: params[:id])
    if @note && @note.shared
      render :show
    else
      render text: "Note does note exist or is private"
    end
  end

end
