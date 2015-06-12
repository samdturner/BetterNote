require 'common_substring'

class Note < ActiveRecord::Base
  include CommonSubstring

  validates :user_id, presence: true

  belongs_to :user
  belongs_to :notebook

  def self.select_notes(user_id, sort_col, asc_desc, start_row)
    notes = Note.select_sorted(user_id, sort_col, asc_desc)
    notes.limit(10).offset(start_row)
  end

  def self.select_by_notebook(user_id, sort_col, asc_desc, start_row, notebook_id)
    
    notes = Note.select_sorted(user_id, sort_col, asc_desc)
    notes = notes.where(notebook_id: notebook_id)
    notes.limit(10).offset(start_row)
  end

  def self.select_sorted(user_id, sort_col, asc_desc)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    start_row = start_row || 0
    Note.where(user_id: user_id).order("#{sort_col} #{asc_desc}")
  end

  def contains_substr?(substr)
    substr_match?(substr, self.title) || substr_match?(substr, self.content)
  end
end
