class Tag < ActiveRecord::Base
  validates :name, :user_id, presence: true
  validates_uniqueness_of :user_id, :scope => :name

  belongs_to :user
  has_many :tag_assignments, dependent: :destroy
  has_many :notes, through: :tag_assignments, source: :note
end
