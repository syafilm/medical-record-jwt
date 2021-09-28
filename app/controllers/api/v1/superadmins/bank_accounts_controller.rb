module Api
  module V1
    module Superadmins
      class BankAccountsController < Api::V1::BaseController
        before_action :authenticate_superadmin!

        def update
          id = params['id']
          bank_account = BankAccount.find_by(id: id)
          superadmin = current_superadmin
          superadmin_id = superadmin.present? ? superadmin.id : ''
          @bank_account = BankAccountsService.new(superadmin, bank_account_params).object_create(bank_account)

          if @bank_account.save
            render json: @bank_account
          end
        end

        def detail
          id = params['id']
          @bank_account = BankAccount.find_by(id: id)
          render json: @bank_account, status: :ok
        end

        private

          def bank_account_params
            params.require(:bank_account).permit(
              :bankname,
              :iban,
              :bic,
              :account_holder,
              :superadmin_id,
              :staff_id
            )
          end
        end

    end
  end
end