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

ActiveRecord::Schema.define(version: 2021_09_08_013419) do

  create_table "bank_accounts", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "bankname"
    t.string "iban"
    t.string "bic"
    t.string "account_holder"
    t.bigint "superadmin_id"
    t.bigint "staff_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["staff_id"], name: "index_bank_accounts_on_staff_id"
    t.index ["superadmin_id"], name: "index_bank_accounts_on_superadmin_id"
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

  create_table "clinic_structures", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.bigint "bank_account_id"
    t.bigint "superadmin_id"
    t.bigint "client_id"
    t.bigint "employee_state_id"
    t.text "streetname"
    t.text "streetnumber"
    t.text "zip_code"
    t.text "region"
    t.text "country"
    t.text "company_name"
    t.text "ceo_owner"
    t.text "website"
    t.text "phone_clinic"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bank_account_id"], name: "index_clinic_structures_on_bank_account_id"
    t.index ["client_id"], name: "index_clinic_structures_on_client_id"
    t.index ["employee_state_id"], name: "index_clinic_structures_on_employee_state_id"
    t.index ["superadmin_id"], name: "index_clinic_structures_on_superadmin_id"
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
    t.string "name", default: "", null: false
    t.string "slug", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_departments_on_slug", unique: true
  end

  create_table "documents", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "file"
    t.string "name"
    t.integer "size"
    t.string "description"
    t.string "model_type"
    t.integer "model_id"
    t.bigint "superadmin_id"
    t.bigint "client_id"
    t.bigint "staff_id"
    t.text "uuid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "extension"
    t.string "upload_type"
    t.index ["client_id"], name: "index_documents_on_client_id"
    t.index ["staff_id"], name: "index_documents_on_staff_id"
    t.index ["superadmin_id"], name: "index_documents_on_superadmin_id"
  end

  create_table "employee_states", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.datetime "entry"
    t.datetime "exit"
    t.datetime "contract"
    t.bigint "superadmin_id"
    t.bigint "staff_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["staff_id"], name: "index_employee_states_on_staff_id"
    t.index ["superadmin_id"], name: "index_employee_states_on_superadmin_id"
  end

  create_table "qualifications", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "slug", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_qualifications_on_slug", unique: true
  end

  create_table "staffs", charset: "utf8mb4", collation: "utf8mb4_bin", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.text "stf"
    t.text "name"
    t.text "surname"
    t.text "streetname"
    t.text "streetnumber"
    t.text "zip_code"
    t.text "region"
    t.text "country"
    t.text "phone"
    t.bigint "superadmin_id"
    t.text "last_despatch"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "avatar"
    t.text "files"
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
    t.string "name", default: "", null: false
    t.string "slug", default: "", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_tags_on_slug", unique: true
  end

  create_table "versions", charset: "utf8mb4", force: :cascade do |t|
    t.string "item_type", limit: 191, null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object", size: :long
    t.datetime "created_at"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
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
