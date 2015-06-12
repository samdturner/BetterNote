class TagAssignment < ActiveRecord::Base
  belongs_to :note
  belongs_to :tag
end
