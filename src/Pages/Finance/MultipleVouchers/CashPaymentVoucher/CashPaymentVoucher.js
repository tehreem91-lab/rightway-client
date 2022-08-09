import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'
import voucherTypes from '../../../../config/voucherTypes'

const CashPaymentVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
      accountAbbr={`allexceptbank`}
      voucherAbbr={voucherTypes[1].abbreviation}
      voucher_type_id={voucherTypes[1].voucher_id}
      page_name={voucherTypes[1].type_name}

    />
  )
}

export default CashPaymentVoucher