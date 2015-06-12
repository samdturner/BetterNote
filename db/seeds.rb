# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

TagAssignment.delete_all
Note.delete_all
Notebook.delete_all
Tag.delete_all
User.delete_all

user = User.create!(email: 'example', password: 'password')

5.times do
  Notebook.create!(user_id: user.id, title: Faker::Lorem.word)
end

notebook_ids = []

Notebook.all.each { |notebook| notebook_ids << notebook.id }
notebook_id = Notebook.first.id

tag1 = Tag.create!(name: "Awesome Tag", user_id: user.id)
tag2 = Tag.create!(name: "Unawesome Tag", user_id: user.id)

notes = []
50.times do |n|
  # idx = n % 5
  # notebook_id = notebook_ids[idx]
  notes << Note.create!(user_id: user.id, title: Faker::Lorem.word,
                        notebook_id: notebook_id, content: Faker::Lorem.paragraph)
end

10.times do |n|
  TagAssignment.create!(note_id: notes[n].id, tag_id: tag1.id)
  TagAssignment.create!(note_id: notes[n].id, tag_id: tag2.id)
  TagAssignment.create!(note_id: notes[n + 10].id, tag_id: tag1.id)
end
