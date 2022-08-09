import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'
import voucherTypes from '../../../../config/voucherTypes'

const CashReceiveVoucher = () => {
  return (
    <MultiVoucherGlobalTemplate
      accountAbbr={`allexceptbank`}
      voucherAbbr={voucherTypes[0].abbreviation}
      voucher_type_id={voucherTypes[0].voucher_id}
      page_name={voucherTypes[0].type_name}

    />
  )
}

export default CashReceiveVoucher