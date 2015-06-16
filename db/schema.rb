# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150616030457) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notebooks", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notes", force: :cascade do |t|
    t.integer  "user_id",                            null: false
    t.integer  "notebook_id"
    t.string   "title",       default: "(No Title)"
    t.text     "content"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.boolean  "shared",      default: false
    t.string   "shared_url"
  end

  add_index "notes", ["shared_url"], name: "index_notes_on_shared_url", unique: true, using: :btree

  create_table "tag_assignments", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "note_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tag_assignments", ["note_id"], name: "index_tag_assignments_on_note_id", using: :btree
  add_index "tag_assignments", ["tag_id", "note_id"], name: "index_tag_assignments_on_tag_id_and_note_id", unique: true, using: :btree
  add_index "tag_assignments", ["tag_id"], name: "index_tag_assignments_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["name", "user_id"], name: "index_tags_on_name_and_user_id", unique: true, using: :btree
  add_index "tags", ["user_id"], name: "index_tags_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  add_foreign_key "notebooks", "users"
  add_foreign_key "notes", "notebooks"
  add_foreign_key "notes", "users"
end
