
import Dashboard from ".././Pages/Home/Dashboard.js/Dashboard";
import AddRole from ".././Pages/Role/AddRole";
import AddUser from ".././Pages/Role/AddUser";
import AddPages from ".././Pages/Role/AddPages";
import AddModules from ".././Pages/Role/AddModules";
import RolePermission from ".././Pages/Role/RolePermission.js";
import CompanyInfo from ".././Pages/General/CompanyInfo";
import CityNames from ".././Pages/General/CityNames";
import Banknames from ".././Pages/General/Banknames";
import AddMachines from ".././Pages/General/AddMachines";
import AddShifts from ".././Pages/General/AddShifts";
import EmployeeDesignations from ".././Pages/General/EmployeeDesignations";
import StockUnits from ".././Pages/General/StockUnits";
import CurrencyUnits from ".././Pages/General/CurrencyUnits";
import Categories from ".././Pages/Finance/Categories/Categories";
// import DataTable from "./DataTable/DataTable";
import TestDataTable from ".././Pages/Role/TestDataTable";
import BranchesPermission from ".././Pages/Role/BranchesPermission";
import VoucherHistory from ".././Pages/Finance/MultipleVouchers/VoucherHistory/VoucherHistory";
import AddBranches from ".././Pages/Role/AddBranches";
import BankPaymentVoucher from ".././Pages/Finance/MultipleVouchers/BankPaymentVoucher/BankPaymentVoucher";
import BankReceiveVoucher from ".././Pages/Finance/MultipleVouchers/BankReceiveVoucher/BankReceiveVoucher";
import CashPaymentVoucher from ".././Pages/Finance/MultipleVouchers/CashPaymentVoucher/CashPaymentVoucher";
import CashReceiveVoucher from ".././Pages/Finance/MultipleVouchers/CashReceiveVoucher/CashReceiveVoucher";
import JournalVoucher from ".././Pages/Finance/MultipleVouchers/JournalVoucher/JournalVoucher";
import JournalVoucherSingle from ".././Pages/Finance/SingleMultipleVoucher/JournalVoucherSingle";
import PayableReceivableReport from ".././Pages/Finance/Reports/PayableReceivableReport/PayableReceivableReport";
import GeneralLadger from ".././Pages/Finance/Ladger/GeneralLadger/GeneralLadger";



const ROUTES = {
    AddRole: { id: '1', element: AddRole, path: "RoleAccess" },
    VoucherHistory: { id: '2', element: VoucherHistory, path: "VoucherHistoryAccess" },
    AddModules: { id: '3', element: AddModules, path: "ModuleAccess" },
    AddUser: { id: '4', element: AddUser, path: "UserAccess" },
    TestDataTable: { id: '5', element: TestDataTable, path: "TestDataTable" },
    BranchesPermission: { id: '6', element: BranchesPermission, path: "BranchesPermissionAccess" },
    BankPaymentVoucher: { id: '7', element: BankPaymentVoucher, path: "BankPaymentAccess" },
    BankReceiveVoucher: { id: '8', element: BankReceiveVoucher, path: "BankReceiveAccess" },
    CashPaymentVoucher: { id: '10', element: CashPaymentVoucher, path: "CashPaymentAccess" },
    CashReceiveVoucher: { id: '11', element: CashReceiveVoucher, path: "CashReceiveAccess" },
    JournalVoucher: { id: '12', element: JournalVoucher, path: "JournalVoucherAccess" },
    JournalVoucherSingle: { id: '13', element: JournalVoucherSingle, path: "JournalVoucherSingleAccess" },
    PayableReceivableReport: { id: '14', element: PayableReceivableReport, path: "PayableReceivableReportAccess" },
    GeneralLadger: { id: '15', element: GeneralLadger, path: "LadgerAccess" },
    RolePermission: { id: '16', element: RolePermission, path: "PermissionAccess" },
    AddPages: { id: '17', element: AddPages, path: "PagesAccess" },
    Dashboard: { id: '18', element: Dashboard, path: "/" },
    CompanyInfo: { id: '19', element: CompanyInfo, path: "CompanyInfo" },
    Banknames: { id: '20', element: Banknames, path: "Banknames" },
    EmployeeDesignations: { id: '21', element: EmployeeDesignations, path: "Designation" },
    CurrencyUnits: { id: '22', element: CurrencyUnits, path: "CurrencyUnits" },
    AddMachines: { id: '23', element: AddMachines, path: "Machines" },
    AddBranches: { id: '24', element: AddBranches, path: "AddBranchesAccess" },
    AddShifts: { id: '25', element: AddShifts, path: "Shifts" },
    CityNames: { id: '26', element: CityNames, path: "CityNames" },
    StockUnits: { id: '27', element: StockUnits, path: "StockUnits" },
    Categories: { id: '28', element: Categories, path: "Categories" },
};

export default ROUTES;

