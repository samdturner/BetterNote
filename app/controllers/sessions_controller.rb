class SessionsController < ApplicationController
  before_action :redirect_if_signed_in!, only: [:new]

  def new
  end

  def create
    user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
    )
    if user
      sign_in(user)
      redirect_to ''
    else
      flash.now[:errors] = "Invalid login credentials"
      render :new
    end
  end

  def destroy
    sign_out
    render :new
  end
end
