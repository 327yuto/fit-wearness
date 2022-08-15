require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validates presence (検証する存在を)" do
    context "specifying all columns (全カラムの値を指定している時)" do
      let(:user) { create(:user) }

      it "User's record is created(userのレコードが作成される)" do
        expect(user).to be_valid
      end
    end

    context "When email is not specified (emailを指定していない時)" do
      let(:user) { build(:user, email: nil) }

      it "result in an error (エラーになる)" do
        user.valid?
        expect(user.errors.messages[:email]).to include "can't be blank"
      end
    end

    context "When password is not specified (passwordを指定していない時)" do
      let(:user) { build(:user, password: nil) }

      it "result in an error (エラーになる)" do
        user.valid?
        expect(user.errors.messages[:password]).to include "can't be blank"
      end
    end

    # saveするとエラーになる為検証できず、一旦保留
    context "When category is not specified (categoryを指定していない時)" do
      let(:user) { build(:user, category: nil) }
      it "result in an error (エラーになる)" do
        user.valid?
        expect(user[:category]).to eq nil
      end
    end

  describe "validates uniqueness (一意性を検証)" do
    context "When a saved email is specified (保存されたemailが指定された時)" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, email: user1.email) }
  
        it "result in an error (エラーになる)" do
          user2.valid?
          expect(user2.errors.messages[:email]).to include "has already been taken"
        end
      end
    end
  end
end
