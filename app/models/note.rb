class Note < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user

  def self.created_date(sort_col, asc_desc)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    sql = "Select * from Notes Order By #{sort_col} #{asc_desc} Limit 5"
    Note.connection.execute(sql)
  end
end
