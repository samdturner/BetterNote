class Note < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user

  def self.select_notes(sort_col, asc_desc, start_row)
    sort_col = sort_col || "created_at"
    asc_desc = asc_desc || "DESC"
    start_row = start_row || 0
    sql = "Select * from Notes Order By #{sort_col} #{asc_desc} "\
          "Limit 10 Offset #{start_row}"
    Note.connection.execute(sql)
  end

  def contains_substr?(substr)
    self.substr_match?(:title, substr) || self.substr_match?(:content, substr)
  end

  def substr_match?(section, substr)
    m = i = 0
    body = section == :title ? self.title : self.content
    body_length = body.length
    substr_length = substr.length
    t = kmp_table(substr)
    while m + i < body_length
      if substr[i] == body[m + i]
        i += 1
        return true if i == substr_length
      else
        m += i - t[i]
        i = [0, t[i]].max
      end
    end

    false
  end

  def kmp_table(w)
    pos = 2
    cnd = 0
    t = [-1, 0]
    wlen = w.length
    while pos < wlen
      if w[pos-1] == w[cnd]
        cnd += 1
        t[pos] = cnd
        pos += 1
      elsif cnd > 0
        cnd = t[cnd]
      else
        t[pos] = 0
        pos += 1
      end
    end

    t
  end
end
