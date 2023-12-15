FactoryBot.define do
  factory :user do
    name_users { 'John Doe' }
    email { 'john43@example.com' }
    password { 'password123' }
    password_confirmation { 'password123' } # Asegúrate de que coincida con la contraseña
  end
end