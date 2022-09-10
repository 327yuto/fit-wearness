User.create!(
  [
   {
   # id: 1,
   email: 'user_seed@test.com',
   password: 'password',
   password_confirmation: 'password',
   category: 'test category',
   confirmed_at: Date.today
   },

   {
   # id: 2,
   email: 'user_2@test.com',
   password: 'password',
   password_confirmation: 'password',
   category: 'test category2',
   confirmed_at: Date.today
   }
  ]
)
