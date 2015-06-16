require 'common_substring'

class Note < ActiveRecord::Base
  include CommonSubstring

  validates :user_id, presence: true

  belongs_to :user
  belongs_to :notebook

  has_many :tag_assignments, dependent: :destroy

  has_many :tags, through: :tag_assignments, source: :tag

  before_validation :assign_shared_url_hash, unless: :note_exists?

  def self.select_all(user_id, sort_col, asc_desc, start_row)
    notes = Note.select_sorted(Note.all, user_id, sort_col, asc_desc)
    Note.limit_selection(notes, start_row)
  end

  def self.select_by_tag(tag_id, user_id, sort_col, asc_desc, start_row)
    tag = Tag.find(tag_id)
    notes = tag.notes.where(user_id: user_id).order("#{sort_col} #{asc_desc}")
    Note.limit_selection(notes, start_row)
  end

  def self.select_by_notebook(user_id, sort_col, asc_desc, start_row, notebook_id)
    notes = Note.select_sorted(Note.all, user_id, sort_col, asc_desc)
    notes = notes.where(notebook_id: notebook_id)
    Note.limit_selection(notes, start_row)
  end

  def self.select_sorted(notes, user_id, sort_col, asc_desc)
    notes.where(user_id: user_id).order("#{sort_col} #{asc_desc}")
  end

  def self.limit_selection(notes, start_row)
    notes.limit(10).offset(start_row)
  end

  def contains_substr?(substr)
    substr_match?(substr, self.title) || substr_match?(substr, self.content)
  end

  private
  def assign_shared_url_hash
    self.shared_url = SecureRandom.urlsafe_base64(16) unless note_exists?
  end

  def note_exists?
    !!self.id
  end
end
