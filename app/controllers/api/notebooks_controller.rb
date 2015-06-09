class Api::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.all

    render json: @notebooks
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
