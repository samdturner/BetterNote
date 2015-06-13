class AddConstraintsToTags < ActiveRecord::Migration
  def change
    add_index :tag_assignments, [:tag_id, :note_id], unique: true
    add_index :tags, [:name, :user_id], unique: true
  end
end
