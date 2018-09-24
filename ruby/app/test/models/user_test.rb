require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      name: 'Example User', 
      email: 'test@test.com',
      password: "test_pass",
      password_confirmation: "test_pass" 
    )

  end

  test "should be valid" do
    assert @user.valid?
  end
  
  test "name should be present" do
    @user.name= " "
    assert_not @user.valid?
  end

  test "name should not be too long" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email= " "
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 256
    assert_not @user.valid?
  end

  test "should accept valid emails" do
    valid_addresses = %w[te+st@test.com test.test@test.test.ca BIG_TEST@malltest.net]
    valid_addresses.each do |address|
      @user.email = address
      assert @user.valid?
    end
  end

  test "should not accept invalid emails" do
    invalid_addresses = %w[te+st@test,com test.testtest.test.ca BIG_TEST@malltest. foo@bar_.com]
    invalid_addresses.each do |address|
      @user.email = address
      assert_not @user.valid?
    end
  end

  test "email should be unique" do
    dupe = @user.dup
    dupe.email.upcase!
    @user.save
    assert_not dupe.valid?
  end

  test "password should not be too long" do
    @user.password = @user.password_confirmation = "a" * 51
    assert_not @user.valid?
  end

  test "password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 4
    assert_not @user.valid?
  end

  test "passwords should match" do
    @user.password = "TEST"
    assert_not @user.valid?
  end

  test "associated microposts should be destroyed" do
    @user.save
    @user.microposts.create(content: "This won't last")
    assert_difference 'Micropost.count', -1 do
      @user.destroy
    end
  end

  test "should follow and unfollow a user" do
    zack = users(:Zack)
    zack2 = users(:Zack2)
    zack.follow(zack2)
    assert zack2.followers.include?(zack)
    assert zack.following?(zack2)
    zack.unfollow(zack2)
    assert_not zack.following?(zack2)
    assert_not zack2.followers.include?(zack)
  end

end
