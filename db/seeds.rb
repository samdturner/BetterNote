# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Note.delete_all
User.delete_all

user = User.create!(email: 'example', password: 'password')

5.times do
  Notebook.create!(user_id: user.id, title: Faker::Lorem.word)
end

notebook_ids = []

Notebook.all.each { |notebook| notebook_ids << notebook.id }

50.times do |n|
  idx = n % 5
  notebook_id = notebook_ids[idx]
  Note.create!(user_id: user.id, title: Faker::Lorem.word,
               notebook_id: notebook_ids, content: Faker::Lorem.paragraph)
end
