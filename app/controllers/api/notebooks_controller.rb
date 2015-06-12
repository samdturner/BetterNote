class Api::NotebooksController < ApplicationController
  before_action :require_signed_in!

  def index
    @notebooks = Notebook.where("user_id = ?", current_user.id)
    substr = params[:substr]
    if (substr && substr != "")
      @notebooks = @notebooks.select do |notebook|
        notebook.contains_substr?(substr)
      end
    end

    render json: @notebooks
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @notebook = Notebook.find(params[:id])
    if @notebook && @notebook.user_id == current_user.id
      render json: @notebook
    else
      render text: "You can only view your own notebook", status: :forbidden
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
