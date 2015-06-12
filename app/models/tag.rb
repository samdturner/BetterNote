class Tag < ActiveRecord::Base
  belongs_to :user
  has_many :tag_assignments, dependent: :destroy
  has_many :notes, through: :tag_assignments, source: :note
end
