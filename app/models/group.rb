class Group < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true

  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  def show_last_messages
    if(last_message = messages.last).present?
      last_message.body? ? last_message.body : '画像が投稿されています'
    else
      'まだメッセージはありません'
    end
  end
end
