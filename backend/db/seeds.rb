User.create!(
  [
   {
   # id: 1,
   email: 'user_seed@test.com',
   password: 'password',
   password_confirmation: 'password',
   name: 'one man',
   metadata: 'Iam oneman. follow me!',
   category: 'test category',
   confirmed_at: Date.today
   },

   {
   # id: 2,
   email: 'user_2@test.com',
   password: 'password',
   password_confirmation: 'password',
   name: 'two man',
   metadata: 'Iam twoman. yeah!',
   category: 'test category2',
   confirmed_at: Date.today
   }
  ]
)

# Post.create!(
#   picture:File.open('./man-839604_1280.jpg'), 
#   category: 'ワークアウト', 
#   user_id: 1)
