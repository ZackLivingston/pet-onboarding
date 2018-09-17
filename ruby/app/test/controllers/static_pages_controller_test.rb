require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_path
    assert_response :success
    assert_select "title", "Home Page | Test Ruby Site"
  end

  test "should get help" do
    get help_path
    assert_response :success
    assert_select "title", "Help Page | Test Ruby Site"
  end

  test "should get contact" do
    get contact_path
    assert_response :success
    assert_select "title", "Contact Page | Test Ruby Site"
  end

end

#Guard?
