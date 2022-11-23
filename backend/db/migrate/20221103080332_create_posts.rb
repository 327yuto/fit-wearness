class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|

      t.references :user, foreign_key: true
      t.string :picture, null: false
      t.string :category, null: false
      t.text :content,  limit: 140

      t.timestamps
    end
  end
end
