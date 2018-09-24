require 'test_helper'

class UserEditTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:Zack)
  end
  
  test "invalid edit" do
    log_in_as(@user)
    get edit_user_path(@user)
    assert_template 'users/edit'
    patch user_path(@user), params: 
      {user:
       {name: "", email: 'fake@fake.com', password: 'no'}}
    assert_template 'users/edit'
  end

  test "valid edit" do
    log_in_as(@user)
    get edit_user_path(@user)
    assert_template 'users/edit'
    name = "Foo Bar"
    email = "foo@bar.com"
    patch user_path(@user), params: 
      { user: 
        { name: name,
          email: email,
          password: "testp",
        } 
      }
    # assert_not flash.empty?
    # assert_redirected_to @user
    @user.reload
    assert_equal name,  @user.name
    assert_equal email, @user.email
  end
end
