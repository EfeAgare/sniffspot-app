require 'rails_helper'

RSpec.describe Review, type: :model do
  describe 'validation' do
    it { should validate_presence_of(:rating) }
    it { should validate_presence_of(:content) }
  end

  describe 'association' do
    it { should belong_to(:spot) }
  end
end
