require 'common_substring'

class Note < ActiveRecord::Base
  include CommonSubstring

  validates :user_id, presence: true

  belongs_to :user
  belongs_to :notebook

  def self.select_notes(user_id, sort_col, asc_desc, start_row)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    start_row = start_row || 0
    sql = "Select * From notes Where notes.user_id = #{user_id}" 
          "Order By #{sort_col} #{asc_desc} "\
          "Limit 10 Offset #{start_row}"
    Note.connection.execute(sql)
  end

  def contains_substr?(substr)
    substr_match?(substr, self.title) || substr_match?(substr, self.content)
  end
end
