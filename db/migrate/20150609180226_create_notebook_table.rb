class CreateNotebookTable < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.integer :user_id
      t.string :title

      t.timestamps
    end
    add_foreign_key :notebooks, :users
  end
end
