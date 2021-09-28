class BankAccountsService
  def initialize(superadmin, params)
    @bankname = params[:bankname]
    @iban = params[:iban]
    @bic = params[:bic]
    @account_holder = params[:account_holder]
    @superadmin = superadmin
  end

  def perform_create
    BankAccount.new(
      bankname: @bankname,
      iban: @iban,
      bic: @bic,
      account_holdler: @account_holdler,
      superadmin_id: @superadmin.id
    )
  end

  def object_create(bank_account)
    bank_account.bankname = @bankname if @bankname.present?
    bank_account.iban = @iban if @iban.present?
    bank_account.bic = @bic if @bic.present?
    bank_account.account_holder = @account_holder if @account_holder.present?
    bank_account.superadmin_id = @superadmin.id if @superadmin.present?
    bank_account
  end  
end
