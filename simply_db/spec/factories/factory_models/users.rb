FactoryBot.define do
  factory :user do
    name_users { 'John Doe' }
    email { 'john43@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end