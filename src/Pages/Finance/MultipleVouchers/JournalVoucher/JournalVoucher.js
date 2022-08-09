import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'

const JournalVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
    voucherAbbr={`JV`}
    accountAbbr={`all`}
    voucher_type_id={10}
    page_name={`Journal Voucher`}
  /> 
  )
}

export default JournalVoucher