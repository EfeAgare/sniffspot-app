require 'rails_helper'

RSpec.describe "Api::V1::Spots", type: :request do
  # Initialize test data
  let!(:spots) { create_list(:spot, 10, price: 50) }
  let!(:spots_1) { create_list(:spot, 4, price: 10) }
  let(:spot_id) { spots.first.id }

  # Test suite for GET /api/v1/spots
  describe "GET /api/v1/spots" do
    # make HTTP get request subject each example
    subject { get '/api/v1/spots', params: { format: "application/json" } }

    it "returns spots" do
      subject

      expect(JSON.parse(response.body)).not_to be_empty
      expect(JSON.parse(response.body).size).to eq Spot.count
    end

    it "returns status code 200" do
      subject

      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/spots/:id
  describe "GET /api/v1/spots/:id" do
    subject { get "/api/v1/spots/#{spot_id}", params: { format: "application/json"  }}

    context "when the record exists" do
      
      it "returns the spot" do
        subject

        expect(JSON.parse(response.body)).not_to be_empty
        expect(JSON.parse(response.body)['id']).to eq(spot_id)
      end

      it "returns status code 200" do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      let(:spot_id) { 100 }

      it "returns status code 404" do
        subject

        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        subject

        expect(JSON.parse(response.body)).to match(/Couldn't find Spot/)
      end
    end
  end

  # Test suite for POST /api/v1/spots
  describe "POST /api/v1/spots" do
    # valid payload
    let(:valid_attributes) { { title: "Spot 11", description: "New spot", price: 100.0 } }

    context "when the request is valid" do
      subject { post '/api/v1/spots', params: { spot: valid_attributes, format: "application/json"} }

      it "creates a spot" do
        subject
        expect(JSON.parse(response.body)['title']).to eq('Spot 11')
      end

      it "returns status code 201" do
        subject

        expect(response).to have_http_status(201)
      end
    end

    context "when the request is invalid" do
      subject { post '/api/v1/spots', params: { spot: { title: "Spot 12", }, format: "application/json" } }

      it "returns status code 422" do
        subject
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        subject

        expect(JSON.parse(response.body)["description"]).to include("can't be blank")
        expect(JSON.parse(response.body)["price"]).to include("can't be blank")
      end
    end
  end

  # Test suite for PUT /api/v1/spots/:id
  describe "PUT /api/v1/spots/:id" do
    let(:valid_attributes) { { title: "Updated Spot Title" } }

    context "when the record exists" do
      subject { put "/api/v1/spots/#{spot_id}", params: {spot: valid_attributes, format: "application/json" } }

      it "updates the record" do
        subject

        expect(JSON.parse(response.body)).not_to be_empty
      end

      it "returns status code 200" do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      subject { put "/api/v1/spots/100", params: { spot: valid_attributes, format: "application/json" } }

      it "returns status code 404" do
        subject

        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        subject

        expect(JSON.parse(response.body)).to match(/Couldn't find Spot/)
      end
    end
  end

  describe 'DELETE /api/v1/spots/:id' do
    let(:spot_id) { spots.second.id }

    context 'when the spot exists' do
      subject { delete "/api/v1/spots/#{spot_id}", params: { format: "application/json" } }

      it 'deletes the spot' do
        subject

        expect(Spot.exists?(spot_id)).to be_falsey
      end

      it 'returns a success message' do
        subject

        expect(response.body).to match(/Spot deleted/)
      end

      it 'returns a 200 status code' do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context 'when the spot does not exist' do
      let(:spot_id) { 999 }

      subject { delete "/api/v1/spots/#{spot_id}", params: { format: "application/json"} }

      it 'returns a not found message' do
        subject

        expect(JSON.parse(response.body)).to match(/Couldn't find Spot with 'id'=#{spot_id}/)
      end

      it 'returns a 404 status code' do
        subject

        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'GET /api/v1/sort_spots_by_price' do

    context 'when within the whole spot price range' do

      subject { get "/api/v1/sort_spots_by_price", params: { min_price: 5, max_price: 70, format: "application/json" } }

      it 'returns all spots' do
        subject

        expect(JSON.parse(response.body).length).to eq Spot.count
      end

      it 'returns a 200 status code' do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context 'when with only a subset of price range' do

      subject { get "/api/v1/sort_spots_by_price", params: { min_price: 5, max_price: 15, format: "application/json" } }

      it 'returns spots within the range' do
        subject

        expect(JSON.parse(response.body).length).to eq spots_1.length
      end
    end
  end
end