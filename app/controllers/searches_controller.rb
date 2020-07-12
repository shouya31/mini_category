class SearchesController < ApplicationController
  def new
    @categories = Maincategory.new
    @maincategories = Maincategory.all.order("id ASC").limit(13)
  end

  def search
    item = Maincategory.find(params[:id])
    children_item = item.children
    render json:{ item: children_item }
  end

end
