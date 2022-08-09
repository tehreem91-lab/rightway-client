import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'

const CashReceiveVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
    voucherAbbr={`CRV`}
    accountAbbr={`allexceptbank`}
    voucher_type_id={2}
    page_name={`Cash Receive Voucher`}
  /> 
  )
}

export default CashReceiveVoucher