class Review < ApplicationRecord
  belongs_to :spot

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :content, presence: true
end