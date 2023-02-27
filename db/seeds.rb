# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


spots = [{
  title: "Caitlyn's Private Dog Park In Seattle",
  description: "Temporarily increasing rates to assist with lawn maintenance during rainy season** No public restroom available! Please, no dogs that like to dig. I have a 7 month old pup named Remy that loves dogs! Please let me know if he can join you.",
  price: 10
},{
  title: "Julie's Private Dog Park In Seattle",
  description: "Fully fenced in yard with trees and bushes and plenty of sniffs. A great yard for any dog to get it’s YA-Yas out.  Fully fenced in yard with trees and bushes and plenty of sniffs. A great yard for any dog to get it’s YA-Yas out.",
  price: 45
}]

spots.each do |spot|
  create_spot = Spot.create(title: spot[:title], description: spot[:description], price: spot[:price])

  create_spot.reviews.create!(rating: 3, content: "WHaoooo, awesomee" )
end