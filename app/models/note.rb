class Note < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user

  def self.created_date(sort_col, asc_desc, start_row)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    start_row = start_row || 0
    sql = "Select * from Notes Order By #{sort_col} #{asc_desc} "\
          "Limit 10 Offset #{start_row}"
    Note.connection.execute(sql)
  end
end
