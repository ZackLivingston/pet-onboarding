class MicropostIndexing < ActiveRecord::Migration[5.2]
  def change
  end
  add_index :microposts, [:user_id, :created_at]
end
