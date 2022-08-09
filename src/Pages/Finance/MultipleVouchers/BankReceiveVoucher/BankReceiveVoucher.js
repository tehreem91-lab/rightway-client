
import React from 'react'
import voucherTypes from '../../../../config/voucherTypes'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'
const BankReceiveVoucher = () => {
    return (
        <MultiVoucherGlobalTemplate
            voucherAbbr={voucherTypes[3].abbreviation}
            voucher_type_id={voucherTypes[3].voucher_id}
            page_name={voucherTypes[3].type_name}
            accountAbbr={`allexceptcash`}
        />
    )
}

export default BankReceiveVoucher