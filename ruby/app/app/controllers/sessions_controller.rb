class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      log_in user
      if params[:session][:remember_me] == "1"
        remember user
      else
        forget user
        cookies.delete(:user_id)
        cookies.delete(:remember_token)
      end
      redirect_to user
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    if !session[:user_id].nil?
      log_out(session[:remember_me])
    end
    redirect_to root_url
  end

end
