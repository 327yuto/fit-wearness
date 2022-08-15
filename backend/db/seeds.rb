User.create!(
   email: 'user_seed@test.com',
   password: 'password',
   password_confirmation: 'password',
   category: 'test category',
   confirmed_at: Date.today
)
