import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'

const CashPaymentVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
    voucherAbbr={`CPV`}
    accountAbbr={`allexceptbank`}
    voucher_type_id={3}
    page_name={`Cash Payement Voucher`}
  /> 
  )
}

export default CashPaymentVoucher