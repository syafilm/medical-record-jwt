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

ActiveRecord::Schema.define(version: 2021_07_24_033134) do

  create_table "addresses", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.text "streetname"
    t.integer "streetnumber"
    t.integer "zip_code"
    t.text "region"
    t.text "country"
    t.bigint "staff_id"
    t.bigint "client_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_addresses_on_client_id"
    t.index ["staff_id"], name: "index_addresses_on_staff_id"
  end

  create_table "banks", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.text "bankname"
    t.text "iban"
    t.text "bic"
    t.text "account_holder"
    t.bigint "staff_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["staff_id"], name: "index_banks_on_staff_id"
  end

  create_table "clients", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.text "name"
    t.text "surname"
    t.text "phone"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_clients_on_email", unique: true
    t.index ["reset_password_token"], name: "index_clients_on_reset_password_token", unique: true
  end

  create_table "content_departments", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.bigint "staff_id"
    t.bigint "client_id"
    t.bigint "department_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_content_departments_on_client_id"
    t.index ["department_id"], name: "index_content_departments_on_department_id"
    t.index ["staff_id"], name: "index_content_departments_on_staff_id"
  end

  create_table "content_qualifications", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.bigint "staff_id"
    t.bigint "clients_id"
    t.bigint "qualification_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["clients_id"], name: "index_content_qualifications_on_clients_id"
    t.index ["qualification_id"], name: "index_content_qualifications_on_qualification_id"
    t.index ["staff_id"], name: "index_content_qualifications_on_staff_id"
  end

  create_table "content_tags", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.bigint "staff_id"
    t.bigint "client_id"
    t.bigint "tag_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_content_tags_on_client_id"
    t.index ["staff_id"], name: "index_content_tags_on_staff_id"
    t.index ["tag_id"], name: "index_content_tags_on_tag_id"
  end

  create_table "departments", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.text "name"
    t.text "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "qualifications", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.text "name"
    t.text "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "staffs", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.text "stf"
    t.text "name"
    t.text "surname"
    t.text "phone"
    t.bigint "superadmin_id"
    t.text "last_despatch"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_staffs_on_email", unique: true
    t.index ["reset_password_token"], name: "index_staffs_on_reset_password_token", unique: true
    t.index ["superadmin_id"], name: "index_staffs_on_superadmin_id"
  end

  create_table "superadmins", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_superadmins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_superadmins_on_reset_password_token", unique: true
  end

  create_table "tags", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.text "name"
    t.text "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "workplaces", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.datetime "entry_date"
    t.datetime "exit_date"
    t.datetime "contract_until"
    t.bigint "client_id"
    t.bigint "staff_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_workplaces_on_client_id"
    t.index ["staff_id"], name: "index_workplaces_on_staff_id"
  end

end
