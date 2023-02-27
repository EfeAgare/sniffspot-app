require 'rails_helper'

RSpec.describe "Api::V1::Reviews", type: :request do
  # Initialize test data
  let!(:spot) { create(:spot) }
  let!(:reviews) { create_list(:review, 5, spot_id: spot.id) }
  let(:spot_id) { spot.id }
  let(:id) { reviews.first.id }

  # Test suite for POST /api/v1/spots/:spot_id/reviews
  describe 'POST /api/v1/spots/:spot_id/reviews' do
    let(:valid_attributes) { { rating: 4, content: 'Great spot', spot_id: spot_id } }

    context 'when the request is valid' do
      subject { post "/api/v1/spots/#{spot_id}/reviews", params: {review: valid_attributes, format: "application/json" } }

      it 'creates a review' do
        subject

        expect(JSON.parse(response.body)['content']).to eq('Great spot')
      end

      it 'returns status code 201' do
        subject
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) { { rating: 4, spot_id: spot_id } }

      subject { post "/api/v1/spots/#{spot_id}/reviews", params: {review: invalid_attributes, format: "application/json" } }

      it 'returns status code 422' do
        subject

        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        subject

        expect(JSON.parse(response.body)["content"]).to include("can't be blank")
      end
    end
  end

  # Test suite for PUT /api/v1/spots/:spot_id/reviews/:id
  describe 'PUT /spots/:spot_id/reviews/:id' do
    let(:valid_attributes) { { rating: 5, id: id, spot_id: spot_id } }

    context 'when the review exists' do
      subject { put "/api/v1/spots/#{spot_id}/reviews/#{id}", params: { review: valid_attributes } }

      it 'updates the review' do
        subject

        updated_review = Review.find(id)
        expect(updated_review.rating).to eq(5)
      end

      it 'returns status code 200' do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context 'when the review does not exist' do
      let(:valid_attributes) { { rating: 5, id: 999, spot_id: spot_id } }

      subject { put "/api/v1/spots/#{spot_id}/reviews/999", params: {review: valid_attributes }  }

      it 'returns status code 404' do
        subject

        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        subject

        expect(response.body).to match(/Couldn't find Review/)
      end
    end
  end

  describe 'DELETE /api/v1/spots/:id' do
    let(:review_id) { reviews.second.id }

    context 'when the spot exists' do
      subject { delete "/api/v1/spots/#{spot_id}/reviews/#{review_id}", params: { format: "application/json" } }

      it 'deletes the spot' do
        subject

        expect(Review.exists?(review_id)).to be_falsey
      end

      it 'returns a success message' do
        subject

        expect(response.body).to match(/Review deleted/)
      end

      it 'returns a 200 status code' do
        subject

        expect(response).to have_http_status(200)
      end
    end

    context 'when the spot does not exist' do
      let(:review_id) { 999 }

      subject { delete "/api/v1/spots/#{spot_id}/reviews/#{review_id}", params: { format: "application/json"} }

      it 'returns a not found message' do
        subject

        expect(JSON.parse(response.body)).to include("Couldn't find Review with 'id'=#{review_id}")
      end

      it 'returns a 404 status code' do
        subject

        expect(response).to have_http_status(404)
      end
    end
  end
end
