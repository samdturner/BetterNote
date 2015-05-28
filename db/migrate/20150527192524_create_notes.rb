class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :user_id, null: false
      t.integer :notebook_id
      t.string :title, default: "(No Title)"
      t.text :content
    end
    add_foreign_key :notes, :users
  end
end
