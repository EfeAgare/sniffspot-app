# SniffSpot

Sniffspot is the largest community of safe, private spaces for dogs to play

### Task Done
1. Backend:
 REST API
  - Add new spot with title, description, list of images, and
  price
  - Edit spot title, description, list of images, and price
  - List of spots
  - Add reviews to a specific spot
  - Edit reviews to a specific spot
  - Sort by price

2. Front-end
  - Ability to add new spots
  - Display a list of spots, show main image, title, price, and number of reviews available
  - Sort by price
  - Select and display a specific spot, list all available images, and handle missing images, also show list of reviews
  - Ability to edit title, description, price of the displayed spot
  - Ability to add and edit reviews of the displayed spot

## Technologies
  * Ruby
  * Git
  * Rspec
  * React
  * Cloudinary
  * Postgres

## Setup
- Ensure you have [ruby](https://rvm.io/rvm/install) installed on your device and also [redis](https://phoenixnap.com/kb/install-redis-on-mac) for background processes

  ```
   Ruby = 3.0.0
  ```

  Clone this repository and cd into the clone specific folder and run the following command 
  accordingly

  ```
   bundle install
  ```

  ```
  yarn
  ```

  ```
   rails db:create 
  ```

  ```
   rails db:migrate
   rails db:seed
  ```

  After to run server

  ```
  rails s
  ```

  ```
  bin/webpack-dev-server
  ```

## Test 
To run all test
```
bundle exec rspec 
```

and to run a specific test 
 ```
 rspec 'relative path to file'
 ```

### What to Improve on:

- UI design
