class AddSharingColumnsNote < ActiveRecord::Migration
  def change
    add_column :notes, :shared, :boolean, default: false
    add_column :notes, :shared_url, :string
    add_index :notes, :shared_url, unique: true
  end
end
