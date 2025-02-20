# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_02_20_160311) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "areas", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.float "latitude"
    t.float "longitude"
    t.integer "reported_cases"
    t.bigint "communicable_disease_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "population"
    t.index ["communicable_disease_id"], name: "index_areas_on_communicable_disease_id"
  end

  create_table "communicable_diseases", force: :cascade do |t|
    t.string "name"
    t.string "image_url", default: "https://images.pexels.com/photos/6303643/pexels-photo-6303643.jpeg?auto=compress&cs=tinysrgb&w=600", null: false
    t.text "description"
    t.text "symptoms"
    t.text "prevention_measures"
    t.boolean "most_prevalent", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "featured"
  end

  create_table "diseases", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "severity"
    t.text "symptoms"
    t.text "prevention"
    t.text "treatment"
    t.boolean "featured"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.text "prevention_measures"
    t.string "most_prevalent"
  end

  create_table "donations", force: :cascade do |t|
    t.decimal "amount"
    t.bigint "user_id", null: false
    t.bigint "area_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_donations_on_area_id"
    t.index ["user_id"], name: "index_donations_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "message"
    t.boolean "read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.text "comment"
    t.bigint "user_id", null: false
    t.bigint "area_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "disease_id", null: false
    t.index ["area_id"], name: "index_reviews_on_area_id"
    t.index ["disease_id"], name: "index_reviews_on_disease_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "First_name"
    t.string "Last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "areas", "communicable_diseases"
  add_foreign_key "donations", "areas"
  add_foreign_key "donations", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "payments", "users"
  add_foreign_key "reviews", "areas"
  add_foreign_key "reviews", "diseases"
  add_foreign_key "reviews", "users"
end
