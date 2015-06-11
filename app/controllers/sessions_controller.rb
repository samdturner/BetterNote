class SessionsController < ApplicationController
  before_action :redirect_if_signed_in, only: [:new, :create, :destroy]

  def new
  end

  def create
    user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
    )
    if user
      sign_in(user)
      redirect_to '/#/notes/new'
    else
      flash.now[:errors] = "Invalid login credentials"
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
