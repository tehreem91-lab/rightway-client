const voucherTypes =
    [{
        voucher_id: 2,
        type_name: "CASH RECIEVE VOUCHER",
        abbreviation: "CRV",
        multiple_router_path: "CashReceiveAccess"
    },
    {
        voucher_id: 3,
        type_name: "CASH PAYMENT VOUCHER",
        abbreviation: "CPV",
        multiple_router_path: "CashPaymentAccess"
    },
    {
        voucher_id: 4,
        type_name: "BANK PAYMENT VOUCHER",
        abbreviation: "BPV",
        multiple_router_path: "BankPaymentAccess"
    },
    {
        voucher_id: 5,
        type_name: "BANK RECIEVED VOUCHER",
        abbreviation: "BRV",
        multiple_router_path: "BankReceiveAccess"
    },
    {
        voucher_id: 10,
        type_name: "JOURNAL VOUCHER",
        abbreviation: "JV",
        multiple_router_path: "JournalVoucherAccess"
    }
    ]
export default voucherTypes;