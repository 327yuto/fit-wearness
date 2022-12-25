User.create!(
  [
    {
    # id: 1,
    email: 'user1_woman@example.com',
    password: 'password',
    password_confirmation: 'password',
    name: 'ソフィア',
    metadata: 'ジムでのトレーニングウェアを投稿しています',
    category: 'ヨガ',
    image:File.open('./public/sample_picture/post-wear1-1.jpeg'), 
    confirmed_at: Date.today
    },

    {
    # id: 2,
    email: 'user2_man@example.com',
    password: 'password',
    password_confirmation: 'password',
    name: 'ウィリアム',
    metadata: 'ジムウェア、ランニングウェアを投稿します',
    category: 'ワークアウト',
    image:File.open('./public/sample_picture/post-wear2-1.jpeg'), 
    confirmed_at: Date.today
    }
  ]
)

Post.create!(
  [
    {
    # id: 1, 
    picture:File.open('./public/sample_picture/post-wear1-1.jpeg'), 
    category: 'ヨガ', 
    user_id: 1,
    content: '今日のコーディネート',
    },
  
    {
    # id: 2, 
    picture:File.open('./public/sample_picture/post-wear1-2.jpeg'), 
    category: 'ヨガ', 
    user_id: 1,
    content:
     'イエロー×ブルーの組み合わせGood! 最近のお気に入り',
    },
  
    {
    # id: 3,   
    picture:File.open('./public/sample_picture/post-wear1-3.jpeg'), 
    category: 'ランニング', 
    user_id: 1,
    content: 'このスニーカー軽くて歩きやすい！おすすめ',
    },

    {
    # id: 4, 
    picture:File.open('./public/sample_picture/post-wear2-1.jpeg'), 
    category: 'ワークアウト', 
    user_id: 2,
    content: 'トレーニング後の１枚',
    },
  
    {
    # id: 5, 
    picture:File.open('./public/sample_picture/post-wear2-2.jpeg'), 
    category: 'ワークアウト', 
    user_id: 2,
    content: 'ジムへの移動時にも着れる',
    },  

    {
    # id: 6,  
    picture:File.open('./public/sample_picture/post-wear2-3.jpeg'), 
    category: 'ランニング', 
    user_id: 2,
    content: 'Outfit Of The Day!',
    }, 

    {
    # id: 7,
    picture:File.open('./public/sample_picture/post-wear2-4.jpeg'), 
    category: 'ワークアウト', 
    user_id: 2,
    content: '脚トレ定番のコーディネート！',
    }, 
  ]
  )

  Like.create!(
  [
    {
    # user_id1 のお気に入り, 
    user_id: 1,
    post_id: 4,
    },

    {
    # id: user_id2 のお気に入り, 
    user_id: 2,
    post_id: 1,
    },
  ]
  )
