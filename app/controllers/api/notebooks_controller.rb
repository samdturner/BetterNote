class Api::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.all
    substr = params[:substr]
    if (substr && substr != "" )
      @notebooks = @notebooks.select do |notebook|
        notebook.contains_substr?(substr)
      end
    end

    render json: @notebooks
  end

  def create
    @notebook = Notebook.new(notebook_params)
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
