class Api::V1::ReviewsController < ApplicationController
  before_action :set_spot
  before_action :set_review, only: [:update, :destroy]

  # POST /spots/:spot_id/reviews
  def create
    @review = @spot.reviews.new(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /spots/:spot_id/reviews/1
  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /spots/:spot_id/reviews/1
  def destroy
    @review.destroy

    render json: "Review deleted", status: :ok
  end

  private

  def set_spot
    @spot = Spot.find(params[:spot_id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e, status: :not_found
  end

  def set_review
    @review = @spot.reviews.find(params[:id])
  rescue ActiveRecord::RecordNotFound => e
    render json: e, status: :not_found
  end

  def review_params
    params.require(:review).permit(:content, :rating)
  end
end
