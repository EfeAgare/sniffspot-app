require 'rails_helper'

RSpec.describe Spot, type: :model do
  describe 'validation' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).is_greater_than(0) }
  end

  describe "association" do
    it { should have_many(:reviews) }
    it { should have_many_attached(:images) }
  end
end
