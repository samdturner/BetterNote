class CreateTagAssignment < ActiveRecord::Migration
  def change
    create_table :tag_assignments do |t|
      t.integer :tag_id, null: false
      t.integer :note_id, null: false

      t.timestamps
    end
    add_index :tag_assignments, :tag_id
    add_index :tag_assignments, :note_id
  end
end
