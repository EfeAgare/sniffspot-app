class Api::V1::SpotsController < ApplicationController
  before_action :set_spot, only: [:show, :update, :destroy]
  
  def index
    @spots = Spot.includes(:reviews).with_attached_images.order(price: :asc)

    render json: spots_with_images_and_reviews, status: :ok
  end

  def show
    render json: spot_with_images_and_reviews, status: :ok
  end

  def create
    @spot = Spot.new(spot_params)

    if @spot.save
      if spot_params[:images].present?
        spot_params[:images].each do |image|
          photo = ActiveStorage::Blob.create_and_upload!(
            io: image,
            filename: image&.original_filename,
            content_type: image&.content_type
          )
          @spot.images.attach(photo)
        end
      end
      render json: spot_with_images_and_reviews, status: :created
    else
      render json: @spot.errors, status: :unprocessable_entity
    end
  end

  def update
    if @spot.update(spot_params.reject { |k| k["images"] })
      if spot_params[:images].present?
        ## Delete previous images so add new old
        ## Otherwise it keeps accumulating
        @spot.images.map(&:purge) 

        spot_params[:images].each do |image|

          photo = ActiveStorage::Blob.create_and_upload!(
            io: image,
            filename: image&.original_filename,
            content_type: image&.content_type
          )
          @spot.images.attach(photo)
        end
      end
      render json: spot_with_images_and_reviews, status: :ok
    else
      render json: @spot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @spot.destroy

    render json: "Spot deleted", status: :ok
  end

  def sort_by_price
    @spots = Spot.sort_by_price(params[:min_price], params[:max_price])

    render json: spots_with_images_and_reviews, status: :ok
  end

  private

  def set_spot
    @spot = Spot.includes(:reviews).with_attached_images.find(params[:id])

  rescue ActiveRecord::RecordNotFound => e
    render json: e, status: :not_found
  end

  def spot_params
    params.require(:spot).permit(:title, :description, :price, images: [])
  end

  def spot_with_images_and_reviews
    @spot.as_json.merge({ images: @spot.images.map{|img| ({ url: img.url, label: "#{img.name}_#{img.blob_id}" })}, reviews: @spot.reviews })
  end

  def spots_with_images_and_reviews
    @spots.map { |spot| 
      spot.as_json.merge({ images: 
      spot.images.map{|img| ({ url: img.url, label: "#{img.name}_#{img.blob_id}"  })}, 
      reviews: spot.reviews
    })} 
  end
end

