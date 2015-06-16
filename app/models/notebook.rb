require 'common_substring'

class Notebook < ActiveRecord::Base
  include CommonSubstring

  has_many :notes

  attr_accessor :note_count

  def note_count
    self.notes.count
  end

  def contains_substr?(substr)
    substr_match?(substr, self.title)
  end

  def attributes
    { 'id' => self.id, 'user_id' => self.user_id, 'title' => self.title,
      'created_at' => self.created_at, 'updated_at' => self.updated_at,
      'note_count' => nil }
  end
end
