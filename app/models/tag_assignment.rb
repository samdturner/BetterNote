class TagAssignment < ActiveRecord::Base
  validates :tag_id, :note_id, presence: true
  validates :tag_id, uniqueness: { scope: [:note_id] }

  belongs_to :note
  belongs_to :tag
end
