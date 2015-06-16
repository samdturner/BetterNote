class Tag < ActiveRecord::Base
  validates :name, :user_id, presence: true
  validates_uniqueness_of :user_id, :scope => :name

  belongs_to :user
  has_many :tag_assignments, dependent: :destroy
  has_many :notes, through: :tag_assignments, source: :note

  attr_accessor :note_count

  def note_count
    self.notes.count
  end

  def attributes
    { 'id' => self.id, 'user_id' => self.user_id, 'name' => self.name,
      'created_at' => self.created_at, 'updated_at' => self.updated_at,
      'note_count' => nil }
  end
end
