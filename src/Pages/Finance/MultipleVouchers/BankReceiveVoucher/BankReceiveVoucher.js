
import React from 'react'
import MultiVoucherGlobalTemplate from '../MultiVoucherGlobalTemplate'
const BankReceiveVoucher = () => {
    return (
        <MultiVoucherGlobalTemplate
            voucherAbbr={`BRV`}
            accountAbbr={`allexceptcash`}
            voucher_type_id={5}
            page_name={`Bank Receive Voucher`}
        />
    )
}

export default BankReceiveVoucher