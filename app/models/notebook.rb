require 'common_substring'

class Notebook < ActiveRecord::Base
  include CommonSubstring

  has_many :notes

  def contains_substr?(substr)
    substr_match?(substr, self.title)
  end
end
