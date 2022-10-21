import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { useSelector } from "react-redux";
import Select from 'react-select'
import { endPoint } from '../../../../config/Config'
import { customStyles } from '../../../../Components/reactCustomSelectStyle';
import dateToday, { dateFormaterForInput } from '../../../../config/todayDate';
import CustomInnerHeader from '../../../../Components/CustomInnerHeader'
const BankPaymentVoucher = () => {
  const voucherAbbr = 'JV'
  const accountAbbr = 'allexceptcash'
  const showNavMenu = useSelector((state) => state.NavState);
  const [accountOptions, setAccountOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [voucherDetail, setVoucherDetail] = useState()
  const [voucherDate, setVoucherDate] = useState(dateToday)
  const fetchInitiallAlldata = () => {

    // fetching voucher detail 
    var config = {
      method: 'get',
      url: `${endPoint}api/VoucherInvGenerator?abbr=${voucherAbbr}`,
      headers: {
        'Authorization': "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      }
    };

    axios(config)
      .then(function (response) {

        if (response.status === 200) {

          setVoucherDetail(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // fetching account options 



    var configForAccount = {
      method: 'get',
      url: `${endPoint}api/AccountOptions/GetData?category_name=${accountAbbr}`,
      headers: {
        'Authorization': "Bearer " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
      }
    };

    axios(configForAccount)
      .then(function (res) {
        if (res.status === 200) {
          let accOptions = [];
          console.log(res.data, "selection ");
          res.data.map((eachAccount) => {
            accOptions.push({ value: eachAccount.chart_id, label: `${eachAccount.account_name} (${eachAccount.account_code})`, children: eachAccount?.sub_account, wholeData: eachAccount })
          })
          
          setAccountOptions(accOptions)
        }
        // // required format for account options 
        // [
        //   { label: "option 1", value: 1, children: [{ label: "sub_option_1", value: 1 }, { label: "sub_option_2", value: 2 }] },
        //   { label: "option 2", value: 2, children: [] },
        //   // { label: "option 3", value: 3, children: [{ label: "sub_option_1", value: 1 }, { label: "sub_option_2", value: 2 }, { label: "sub_option_3", value: 3 }, { label: "sub_option_4", value: 4 }] },
        // ]
        // accountOptions , setAccountOptions
      })
      .catch(function (error) {
        console.log(error);
      });


  }
  const [fileEntity, setFileEntity] = useState("");

  // const [selectedOptionValue, setSelectedOptionValue] = useState("")
  const [entryMainState, setEntryMainState] = useState([
    {
      selectedOptionValue: "", showChild: false, naration: "", debit: "1", credit: "4",
      sub_account_State: [{
        //first sub_ladger 
        chart_id: "", account_name: "", account_code: "",
        credit: "12", debit: "45"
      }]
    },
    {
      selectedOptionValue: "", showChild: false, naration: "", debit: "1", credit: "4",
      sub_account_State: [{
        //first sub_ladger 
        chart_id: "", account_name: "", account_code: "",
        credit: "12", debit: "45"
      }]
    }
  ])

  const [reRenderState, setReRenderState] = useState(false)
  const handleAccountSelector = async (e, i) => {
    console.log(e);
    // setEntryMainState([...entryMainState , {selectedOptionValue:e}])
    var arrMain = entryMainState;
    const customizedChild = e.children.map((eachChild) => {
      return { ...eachChild, debit: "", credit: "" }
    })
    arrMain[i] = { ...arrMain[i], selectedOptionValue: e, sub_account_State: [...customizedChild] }
    await setEntryMainState(arrMain)
    setReRenderState(!reRenderState)
  }
  const handleNaration = async (e, i) => {
    console.log(e);
    var arrMain = entryMainState;
    arrMain[i] = { ...arrMain[i], naration: e.target.value }
    console.log(arrMain);
    await setEntryMainState(arrMain)
    console.log(entryMainState);
    setReRenderState(!reRenderState)
  }
  const handleDebit = async (e, i) => {
    console.log(e);
    var arrMain = entryMainState;
    arrMain[i] = { ...arrMain[i], debit: e.target.value }
    console.log(arrMain);
    await setEntryMainState(arrMain)
    console.log(entryMainState);
    setReRenderState(!reRenderState)
  }
  const handleCredit = async (e, i) => {
    console.log(e);
    var arrMain = entryMainState;
    arrMain[i] = { ...arrMain[i], credit: e.target.value }
    console.log(arrMain);
    await setEntryMainState(arrMain)
    console.log(entryMainState);
    setReRenderState(!reRenderState)
  }
  const handleShowChild = async (i) => {

    // setEntryMainState([...entryMainState , {selectedOptionValue:e}])
    var arrMain = entryMainState;
    const showChildState = arrMain[i].showChild
    arrMain[i] = { ...arrMain[i], showChild: !showChildState }
    await setEntryMainState(arrMain)
    console.log(entryMainState);
    setReRenderState(!reRenderState)
  }

  const handle_sub_ladger_debit = async (e, index, i) => {
    var arrMain = entryMainState;
    let updatedInnerSubObject = { ...arrMain[index].sub_account_State[i], debit: e }
    let subStateFiltered = arrMain[index].sub_account_State.filter((eachSubState) => {
      return eachSubState.chart_id !== updatedInnerSubObject.chart_id
    })
    const updatedWholeSubAccountUnsorted = [...subStateFiltered, updatedInnerSubObject]
    const sorted = updatedWholeSubAccountUnsorted?.sort((a, b) => (a.chart_id > b.chart_id ? 1 : -1))
    arrMain[index] = {
      ...arrMain[index],
      sub_account_State: sorted
    }
    await setEntryMainState(arrMain)
    setReRenderState(!reRenderState)



  }
  const handle_sub_ladger_credit = async (e, index, i) => {
    var arrMain = entryMainState;
    let updatedInnerSubObject = { ...arrMain[index].sub_account_State[i], credit: e }
    let subStateFiltered = arrMain[index].sub_account_State.filter((eachSubState) => {
      return eachSubState.chart_id !== updatedInnerSubObject.chart_id
    })
    const updatedWholeSubAccountUnsorted = [...subStateFiltered, updatedInnerSubObject]
    const sorted = updatedWholeSubAccountUnsorted?.sort((a, b) => (a.chart_id > b.chart_id ? 1 : -1))
    arrMain[index] = {
      ...arrMain[index],
      sub_account_State: sorted
    }
    await setEntryMainState(arrMain)
    setReRenderState(!reRenderState)



  }
  const UploadFile = (e) => {
    console.log(fileEntity.target.files[0]);

    const options = {
      onUploadProgerss: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percentage = Math.floor((loaded * 100) / total)
        console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
      }
    }

    let data = new FormData();
    data.append("UploadedImage", fileEntity.target.files[0]);

    axios.post(`${endPoint}/api/FileUpload`, data, options).then(res => {
      console.log(res.data);
    })



  }

  useEffect(() => {
    fetchInitiallAlldata()
  }, [])

  return (
    <>


      <div
        className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
          }   `}
      >
      <CustomInnerHeader moduleName="Bank Payment Voucher" isShowSelector={true} />
      </div>
      <div
        role="main"
        className={`right_col  h-100  ${showNavMenu === false ? "right_col-margin-remove" : " "
          } `}
      >
        <div className="x_panel">


          <div className="x_content mt-3">
            <span className="section pl-4">
              <i className="fa fa-edit"></i>&nbsp;Add/Edit Bank Payment Voucher
            </span>
            <div className="row">
              <div className="field item form-group col-md-6 col-sm-6">
                <label className="col-form-label col-md-3 col-sm-3 label-align"> Voucher # <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    disabled
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    placeholder="BP-2344"
                    value={voucherDetail?.next_voucher_inv}


                  />
                </div>
              </div>
              <div className="field item form-group col-md-6 col-sm-6">
                <label className="col-form-label col-md-3 col-sm-3 label-align"> Date <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    type="date"
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    value={voucherDate}
                    onChange={(e) => setVoucherDate(e.target.value)}
                  // placeholder="i-e. Yellow..."


                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="field item form-group col-md-6 col-sm-6">
                <label className="col-form-label col-md-3 col-sm-3 label-align">Last Voucher # <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    disabled
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    value={voucherDetail?.last_voucher_inv}

                  />
                </div>
              </div>
              <div className="field item form-group col-md-6 col-sm-6">
                <label className="col-form-label col-md-3 col-sm-3 label-align">Last Date <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8">
                  <input
                    disabled
                    type="date"
                    className="form-control"
                    data-validate-length-range={6}
                    data-validate-words={2}
                    name="name"
                    value={dateFormaterForInput(voucherDetail?.last_voucher_created_date)}



                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="field item form-group col-md-6 col-sm-6">
                <label className="col-form-label col-md-3 col-sm-3 label-align">Last Voucher # <span className="required">*</span></label>
                <div className="col-md-8 col-sm-8 ">
                  <div className="row">
                    <div className="col-md-10 ">  <input
                      type="file"
                      className="form-control form-control-sm customStyleForInput"
                      data-validate-length-range={6}
                      data-validate-words={2}
                      name="name"
                      placeholder="BP-2344"
                      multiple
                      onChange={(e) => {
                        setFileEntity(e);
                        console.log(e.target.files[0]);
                      }}
                    /></div>
                    <div className="col-md-1  " style={{ paddingTop: "1.5px" }}>

                      <button className="btn btn-sm btn-outline-success" onClick={() => UploadFile()} type="button"><i className="fa fa-upload"></i></button>

                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className="row mt-2">
              <div className="table-responsive px-3 pb-2" style={{ overflowX: "unset" }}>
                <table className="table table-striped jambo_table bulk_action">
                  <thead >
                    <tr className="headings">
                      <th className="column-title   text-center" width="20%">ACCOUNT</th>
                      <th className="column-title   text-center" width="15%">A/C BALANCE</th>
                      <th className="column-title   text-center" width="32%">NARATION</th>
                      <th className="column-title   text-center" width="13%">DEBIT(RS)</th>
                      <th className="column-title   text-center" width="13%">CREDIT(RS)</th>
                      <th className="column-title   text-center" width="2%">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entryMainState.map((eachEntry, index) => {
                      // console.log(entryMainState[index].selectedOptionValue, "lorem j");
                      return <>
                        <tr className="even pointer"   >
                          <td className="py-0 " colSpan={6}>
                            <table className="table table-striped jambo_table bulk_action border-none-only mb-0">

                              <tbody>
                                <tr className="even pointer"   >
                                  <td className=" " width="20%">
                                    <div className="row">
                                      <div className="col-md-9">
                                        <Select
                                          value={entryMainState[index].selectedOptionValue}
                                          isSearchable={true}
                                          styles={customStyles}
                                          options={accountOptions}
                                          onChange={(e) => handleAccountSelector(e, index)}
                                        />
                                      </div>
                                      <div className="col-md-3">  {
                                        entryMainState[index].selectedOptionValue?.children?.length !== 0 && <span onClick={() => handleShowChild(index)}>
                                          <i className="fa fa-plus-circle"></i>
                                        </span>
                                      }</div>
                                    </div>
                                  </td>
                                  <td className=" " width="15%">
                                    <input
                                      disabled
                                      type="text"
                                      value={entryMainState[index]?.selectedOptionValue?.wholeData?.balance}
                                      className="form-control"
                                      data-validate-length-range={6}
                                      data-validate-words={2}
                                      name="name"

                                    />
                                  </td>
                                  <td className=" " width="32%">
                                    <input
                                      type="text"

                                      value={entryMainState[index].naration}
                                      className="form-control"
                                      data-validate-length-range={6}
                                      data-validate-words={2}
                                      name="name"
                                      placeholder='Enter Naration/Description here'
                                      onChange={(e) => handleNaration(e, index)}
                                    />
                                  </td>
                                  <td className=" " width="13%">
                                    <input
                                      value={entryMainState[index].debit}
                                      type="text"
                                      className="form-control  "
                                      data-validate-length-range={6}
                                      data-validate-words={2}
                                      name="name"
                                      placeholder='debit here'
                                      onChange={(e) => handleDebit(e, index)}
                                    /> </td>
                                  <td className=" " width="13%">
                                    <input

                                      type="text"
                                      value={entryMainState[index].credit}
                                      className="form-control"
                                      data-validate-length-range={6}
                                      data-validate-words={2}
                                      name="name"
                                      placeholder='credit here'
                                      onChange={(e) => handleCredit(e, index)}
                                    />
                                  </td>
                                  <td className="" width="2%" >
                                    <i class="fa fa-times pt-2 text-danger" aria-hidden="true"></i>
                                  </td>

                                </tr>
                                {entryMainState[index].selectedOptionValue?.children?.map((each_sub_ladger, i) => {
                                  return <>  {
                                    entryMainState[index].showChild === true && <tr className="even pointer">
                                      <td className="border-none " colSpan={2}>
                                      </td>
                                      <td className="border-none ">
                                        <input
                                          disabled
                                          type="text"
                                          className="form-control"
                                          data-validate-length-range={6}
                                          data-validate-words={2}
                                          name="name"
                                          placeholder='sub_account_one'
                                          value={entryMainState[index]?.sub_account_State[i]?.account_name}
                                        />
                                      </td>
                                      <td className="border-none ">
                                        <input
                                          value={entryMainState[index].sub_account_State[i].debit}
                                          placeholder='debasdasit'
                                          type="number"
                                          className="form-control"
                                          data-validate-length-range={6}
                                          data-validate-words={2}
                                          name="name"
                                          onChange={(e) => handle_sub_ladger_debit(e.target.value, index, i)}
                                        /> </td>
                                      <td className="border-none ">
                                        <input

                                          type="number"
                                          className="form-control"
                                          data-validate-length-range={6}
                                          data-validate-words={2}
                                          name="name"
                                          placeholder='credit'
                                          onChange={(e) => handle_sub_ladger_credit(e.target.value, index, i)}
                                        />
                                      </td>
                                      <td className="border-none ">
                                      </td>
                                    </tr>

                                  }
                                  </>
                                })}


                              </tbody>
                            </table>
                          </td>





                        </tr>



                      </>
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-12 d-flex justify-content-between x_footer mt-0">
            <button
              type="submit"
              style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}
              className="btn  btn-sm px-3 mt-2"
              onClick={() => { setEntryMainState([...entryMainState, {}]) }}
            >
              Add Another Line
            </button>
            <button
              type="submit"
              style={{ backgroundColor: ' #f79c74 ', color: "white", borderRadius: "20px " }}
              className="btn  btn-sm px-3 mt-2"
            >
              Submit
            </button>



          </div>

        </div>




      </div>

    </>
  )
}

export default BankPaymentVoucher
