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

user1 = User.find(1)
Post.create!(picture: 'user1の投稿', category: 'ワークアウト', user: user1)

user2 = User.find(2)
Post.create!(picture: 'user2の投稿', category: 'ランニング', user: user2)
