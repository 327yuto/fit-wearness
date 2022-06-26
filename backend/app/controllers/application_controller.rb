class ApplicationController < ActionController::API

  def good
    render html: "good!API!" 
  end

end
