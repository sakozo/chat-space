class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :groups_users
end