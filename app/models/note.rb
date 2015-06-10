require 'common_substring'

class Note < ActiveRecord::Base
  include CommonSubstring

  validates :user_id, presence: true

  belongs_to :user
  belongs_to :notebook

  def self.select_notes(sort_col, asc_desc, start_row)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    start_row = start_row || 0
    sql = "Select * from Notes Order By #{sort_col} #{asc_desc} "\
          "Limit 10 Offset #{start_row}"
    Note.connection.execute(sql)
  end

  def contains_substr?(substr)
    substr_match?(self.title, substr) || substr_match?(self.content, substr)
  end
end
