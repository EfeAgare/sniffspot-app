FactoryBot.define do
  factory :review do
    rating { 1 }
    content { "MyString" }
    spot { nil }
  end
end
