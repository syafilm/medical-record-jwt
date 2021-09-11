class DocumentsService
  def initialize(user, params)
    @user = user
    @file = params[:file]
    @model_type = params[:model_type]
    @model_id = params[:model_id]
    @uuid = params[:uuid]
    @upload_type = params[:upload_type]
  end

  def perform_create
    Document.new(
      file: @file,
      model_type: @model_type,
      upload_type: @upload_type,
      # model id is for the current target model, where file is coming from
      model_id: @model_id,
      uuid: @uuid,
      superadmin_id: @user[:role] == 'superadmin' ? @user[:id] : nil,
      staff_id: @user[:role] == 'staff' ? @user[:id] : nil,
      client_id: @user[:role] == 'client' ? @user[:id] : nil,
    )
  end

  def object_create(document)
    document.file = @file if @file.present?
    document.model_type = @model_type if @model_type.present?
    document.model_id = @model_id if @model_id.present?
    document.uuid = @uuid if @uuid.present?
    document.upload_type = @upload_type if @upload_type.present?
    document
  end  
end
