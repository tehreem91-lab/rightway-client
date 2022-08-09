import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'
import voucherTypes from '../../../../config/voucherTypes'


const JournalVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
    accountAbbr={`all`}
    voucherAbbr={voucherTypes[4].abbreviation}
    voucher_type_id={voucherTypes[4].voucher_id}
    page_name={voucherTypes[4].type_name}

  /> 
  )
}

export default JournalVoucher