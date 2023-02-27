class Spot < ApplicationRecord

  has_many :reviews
  has_many_attached :images, dependent: :destroy

  validates :title, presence: true
  validates :description, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }

  scope :sort_by_price, -> (min_price, max_price) {
    includes(:reviews).with_attached_images.where('price BETWEEN ? AND ?', 
                     min_price, max_price).order(price: :asc)
  }
end
