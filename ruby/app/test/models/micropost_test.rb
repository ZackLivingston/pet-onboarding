require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  def setup
    @user = users(:Zack)
    @micropost = @user.microposts.create(content: "test content")
  end
  
  test "should be valid" do
    assert @micropost.valid?
  end

  test "userID should be present" do
    @micropost.user_id = nil
    assert_not @micropost.valid?
  end

  test "content should exist and not be >140 characters" do
    @micropost.content = nil
    assert_not @micropost.valid?
    @micropost.content = 'a' * 141
    assert_not @micropost.valid?
  end

  # test "should be ordered by recency" do
  #   assert_equal microposts(:most_recent), Micropost.first
  # end

end
