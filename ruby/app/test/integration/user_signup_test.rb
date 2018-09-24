require 'test_helper'

class UserSignupTest < ActionDispatch::IntegrationTest
  test "invalid signup info" do
    get signup_path
    assert_no_difference "User.count" do
      post users_path, params: {user: {name: "",
                                      email: 'fake@test.com',
                                      password: 'testpass',
                                      password_confirmation: 'testpass'},
                              }
    end
    assert_template 'users/new'
  end

  test "should display errors" do
    post users_path, params: {user: {name: "",
                                      email: 'fake@test.com',
                                      password: 'testpass',
                                      password_confirmation: 'testpass'},
                              }
    assert_select "#error-explanation"
    assert_select "li"
  end

  test "should accept proper submission" do
    get signup_path
    assert_difference "User.count", 1 do
      post users_path, params: {user: {name: "Test User II",
                                      email: 'fake2@test.com',
                                      password: 'testpass',
                                      password_confirmation: 'testpass'},
                              }
      follow_redirect!
    end
    assert_template 'users/show'
    assert is_logged_in?
  end

end
