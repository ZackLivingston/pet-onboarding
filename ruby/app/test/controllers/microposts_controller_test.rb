require 'test_helper'

class MicropostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:Zack)
    @user2 = users(:Zack2)
    @micropost = @user.microposts.create(content: "test content")
  end

  test "should redirect create when not logged in" do
    assert_no_difference 'Micropost.count' do
      post microposts_path, params: {micropost: {content: 'Lorem ipsum'}}
    end
    assert_redirected_to login_url
  end

  test "should redirect destroy when not logged in" do
    assert_no_difference 'Micropost.count' do
      delete micropost_path(@micropost)
    end
    assert_redirected_to login_url
  end

  test "should create micropost" do
    log_in_as(@user)
    assert_difference 'Micropost.count', 1 do
      post microposts_path, params: {micropost: {id: @micropost.id, content: 'test post'}}
    end
    assert_redirected_to microposts_url
  end

  test "should block bad data for creating a micropost" do
    log_in_as(@user)
    assert_no_difference 'Micropost.count' do
      post microposts_path, params: {micropost: {id: @micropost.id, content: nil}}
    end
    assert_redirected_to root_url
  end

  test "should not allow deleting of someone else's problem" do
    log_in_as(@user2)
    assert_no_difference 'Micropost.count' do
      delete micropost_path(@micropost)
    end
    assert_redirected_to root_url
  end


end
