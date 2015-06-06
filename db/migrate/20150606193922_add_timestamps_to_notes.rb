class AddTimestampsToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :created_at, :datetime, null: false
    add_column :notes, :updated_at, :datetime, null: false
  end
end
