class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :index, :destroy]
  before_action :correct_user, only: [:edit, :update]
  before_action :is_admin, only: :destroy
  
  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    @microposts = @user.microposts.paginate(page: params[:page])
    puts @microposts

  end

  def create
    @user = User.new(user_params)
    if @user.save
      #validate-able user
      log_in @user
      flash[:success] = 'Welcome to the sample app' # data here will only exist for the first request
      redirect_to user_url(@user) #could just have redirect_to @user
    else
      render 'new' # renders the new template
    end
  end

  def edit
    # how does it know that the number in the url is an id?
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = 'Profile Updated'
      redirect_to @user
    else
      #re-render
      render 'edit'
    end
  end

  def index
    @users = User.paginate(page: params[:page])
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User Destroyed'
    redirect_to users_url
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
    # Before Filters

    def correct_user
      @user = User.find(params[:id])
      unless @user == current_user
        redirect_to(root_url) 
      end
    end

    def is_admin
      redirect_to(root_url) unless current_user.admin
    end


end
