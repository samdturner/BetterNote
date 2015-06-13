class TagAssignment < ActiveRecord::Base
  validates :tag_id, :note_id, presence: true

  belongs_to :note
  belongs_to :tag
end
