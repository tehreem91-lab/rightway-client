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
import BankBookLadger from ".././Pages/Finance/Ladger/BankBook/BankBookLadger";
import CashBookLadger from ".././Pages/Finance/Ladger/CashBook/CashBookLadger";
import BalanceSheet from "../Pages/Finance/Reports/BalanceSheet/BalanceSheet";
import PLStatement from "../Pages/Finance/Reports/PLStatement/PLStatement";
import TrialSheet from "../Pages/Finance/Reports/TrialBalance/TrialSheet";
import TransactionReport from "../Pages/Finance/Reports/TransactionReport/TransactionReport";
import OpeningBalances from "../Pages/Finance/OpeningBalances";
import AddBenefits from "../Pages/HRM/AddBenefits";
import Attendance from "../Pages/HRM/Attendance";
import AddEmployee from "../Pages/HRM/AddEmployee";
import AdvancePayementVoucher from "../Pages/HRM/AdvanceManagement/AdvanceVoucher/AdvancePayementVoucher";
import LoanPayementVoucher from "../Pages/HRM/LoanManagement/LoanVoucher/LoanPayementVoucher";
import LoanSettlementVoucher from "../Pages/HRM/LoanManagement/LoanVoucher/LoanSettlementVoucher";
import LoanHistory from "../Pages/HRM/LoanManagement/LoanHistory";
import EmployeeProfile from "../Pages/HRM/EmployeeProfile";
import EmployeeWiseAttendance from "../Pages/HRM/EmployeeWisrAttendance";
import SalaryGeneration from "../Pages/HRM/SalaryGeneration";
import DeptWiseAtten from "../Pages/HRM/DeptWiseAtten";
import SalaryReport from "../Pages/HRM/SalaryReport";
import InwardForm from "../Pages/GatePass/InwardForm";
import PartyInfo from "../Pages/GatePass/PartyInfo";
import DepartmentWiseSalary from "../Pages/HRM/DepartmentWiseSalary";
import AddStock from "../Pages/Stock/AddStock";
import AvailableStock from "../Pages/Stock/AvailableStock";
import AddStore from "../Pages/Store/AddStore";
import AvailableStore from "../Pages/Store/AvailableStore";
import Department from "../Pages/General/Department";
// import LoanApprovalForm from "../Pages/HRM/LoanManagement/LoanApproval/LoanApproval";
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
  BankBookLadger: { id: '29', element: BankBookLadger, path: "BankBookAccess" },
  CashBookLadger: { id: '30', element: CashBookLadger, path: "CashBookAccess" },
  TrialSheet: { id: '31', element: TrialSheet, path: "TrialBalanceAccess" },
  PLStatement: { id: '32', element: PLStatement, path: "PLStatementAccess" },
  BalanceSheet: { id: '33', element: BalanceSheet, path: "BalanceSheetAccess" },
  TransactionReport: { id: '34', element: TransactionReport, path: "TransactionReportAccess" },
  OpeningBalances: { id: '35', element: OpeningBalances, path: "OpeningBalancesAccess" },
  AddBenefits: { id: "36", element: AddBenefits, path: "BenefitsAccess" },
  Attendance: { id: "36", element: Attendance, path: "AttendanceAccess" },
  AddEmployee: { id: "37", element: AddEmployee, path: "EmployeeAccess" },
  AdvancePayementVoucher: { id: "38", element: AdvancePayementVoucher, path: "AdvancePayementVoucherAccess" },
  LoanPayementVoucher: { id: "40", element: LoanPayementVoucher, path: "LoanPayementVoucherAccess" },
  LoanHistory: { id: "41", element: LoanHistory, path: "LoanHistoryAccess" },
  LoanSettlementVoucher: { id: "43", element: LoanSettlementVoucher, path: "LoanSettlementVoucherAccess" },
  EmployeeProfile: { id: "44", element: EmployeeProfile, path: "EmployeeProfileAccess" },
  EmployeeWiseAttendance: { id: "45", element: EmployeeWiseAttendance, path: "EmployeeWiseAttendanceAccess" },
  SalaryGeneration: { id: "46", element: SalaryGeneration, path: "SalaryGenerationAccess" },
  DeptWiseAtten: { id: "47", element: DeptWiseAtten, path: "DepartmentWiseAttendanceAccess" },
  SalaryReport: { id: "48", element: SalaryReport, path: "SalaryReportAccess" },
  InwardForm: { id: "49", element: InwardForm, path: "InwardFormAccess" },
  PartyInfo: { id: "50", element: PartyInfo, path: "PartyInfoAccess" },
  DepartmentWiseSalary:{id:"51", element:DepartmentWiseSalary, path: "DepartmentWiseSalaryAccess"},
  AddStock:{id:"52", element:AddStock, path: "StockAccountAccess"},
  AvailableStock:{id:"53", element:AvailableStock, path: "StockTabelAccesss"},
  AddStore:{id:"54", element:AddStore, path: "AddStoreAccess"},
  AvailableStore:{id:"55", element:AvailableStore, path: "AvailableStoreAccess"},
  Department:{id:"56", element:Department, path: "DepartmentAccess"}


};
export default ROUTES;

