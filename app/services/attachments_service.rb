class AttachmentsService
  def initialize(user, params)
    @user = user
    @file = params[:file]
    @model_type = params[:model_type]
    @model_id = params[:model_id]
    @uuid = params[:uuid]
  end

  def perform_create
    Attachment.new(
      file: @file,
      model_type: @model_type,
      model_id: @model_id,
      uuid: @uuid,
      superadmin_id: @user[:role] == 'superadmin' ? @user[:id] : nil,
      staff_id: @user[:role] == 'staff' ? @user[:id] : nil,
      client_id: @user[:role] == 'client' ? @user[:id] : nil,
    )
  end

  def object_create(attachment)
    attachment.file = @file if @file.present?
    attachment.model_type = @model_type if @model_type.present?
    attachment.model_id = @model_id if @model_id.present?
    attachment.uuid = @uuid if @uuid.present?
    attachment
  end  
end
