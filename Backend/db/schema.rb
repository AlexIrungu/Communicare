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

ActiveRecord::Schema[7.0].define(version: 2025_02_26_150126) do
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
    t.string "risk_level"
    t.date "last_outbreak"
    t.integer "healthcare_facilities"
    t.text "notes"
    t.index ["communicable_disease_id"], name: "index_areas_on_communicable_disease_id"
  end

  create_table "blacklist_tokens", force: :cascade do |t|
    t.string "token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_blacklist_tokens_on_token"
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
    t.text "treatment"
    t.text "risk_factors"
    t.text "transmission"
    t.text "endemic_regions"
    t.string "annual_cases"
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

  create_table "educational_resources", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.boolean "communicable_disease"
    t.string "resource_type"
    t.string "url"
    t.text "description"
    t.string "language"
    t.string "audience"
    t.datetime "publication_date"
  end

  create_table "health_alerts", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "severity"
    t.string "region"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "message"
    t.integer "area_id"
    t.boolean "read", default: false
    t.index ["area_id"], name: "index_health_alerts_on_area_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "message"
    t.boolean "read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "outbreak_histories", force: :cascade do |t|
    t.bigint "communicable_disease_id", null: false
    t.bigint "area_id", null: false
    t.integer "case_count"
    t.date "outbreak_date"
    t.string "severity_level"
    t.string "status"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "fatalities"
    t.boolean "resolved"
    t.text "notes"
    t.index ["area_id"], name: "index_outbreak_histories_on_area_id"
    t.index ["communicable_disease_id"], name: "index_outbreak_histories_on_communicable_disease_id"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "prevention_tips", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "communicable_disease_id"
    t.integer "tip_number"
    t.text "description"
    t.index ["communicable_disease_id"], name: "index_prevention_tips_on_communicable_disease_id"
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

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "area_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_subscriptions_on_area_id"
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "First_name"
    t.string "Last_name"
    t.string "email"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "specialty"
    t.string "role", default: "user"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "areas", "communicable_diseases"
  add_foreign_key "donations", "areas"
  add_foreign_key "donations", "users"
  add_foreign_key "health_alerts", "areas"
  add_foreign_key "notifications", "users"
  add_foreign_key "outbreak_histories", "areas"
  add_foreign_key "outbreak_histories", "communicable_diseases"
  add_foreign_key "payments", "users"
  add_foreign_key "prevention_tips", "communicable_diseases"
  add_foreign_key "reviews", "areas"
  add_foreign_key "reviews", "diseases"
  add_foreign_key "reviews", "users"
  add_foreign_key "subscriptions", "areas"
  add_foreign_key "subscriptions", "users"
end
