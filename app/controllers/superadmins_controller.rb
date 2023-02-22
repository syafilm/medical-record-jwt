class SuperadminsController < ApplicationController
  # before_action :authorize_superadmin, except: %i[login register]

  def home

  end

  #staff function
  def staffs

  end
  
  def staffs_new
    
  end

  def staffs_detail

  end

  #client function
  def clients

  end
  
  def clients_new
    
  end

  def clients_detail

  end


  def login

  end

  def register

  end

  def settings
    
  end

  private
    def authorize_superadmin
      
    end
end
