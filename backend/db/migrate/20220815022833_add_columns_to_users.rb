class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :category, :string, null: false, after: :email
    add_column :users, :metadata, :string, limit: 1000, after: :category

    remove_column :users, :nickname, :string
  end
end
