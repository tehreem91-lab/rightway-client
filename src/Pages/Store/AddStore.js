import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { endPoint } from "../../config/Config";
import { useLocation } from "react-router-dom";
import CustomInnerHeader from "../../Components/CustomInnerHeader";
import { toast } from "react-toastify";
import { customStyles } from "../../Components/reactCustomSelectStyle";
import { useNavigate } from "react-router-dom";

const AddStore = () => {
  const showNavMenu = useSelector((state) => state.NavState);
  const navigation = useNavigate();
  const [isValidateAllStates, setIsValidateAllStates] = useState(true);
  const [storevalue, setstorevalue] = useState("");
  const [accountvalue, setAccountvalue] = useState("");
  const [consumptionvalue, setConsumptionValue] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity_grams, setQuantity_grams] = useState("");
  const [Opening_quantity, setOpening_quantity] = useState("");
  const [Description, setDescription] = useState("");
  const [storeoption, setstoreoption] = useState([]);
  const [consumptionoption, setConsumptionOption] = useState([]);
  const [unitoption, setUnitOption] = useState([]);
  const [isupload, setIsUpload] = useState(false);
  const [fileEntity, setFileEntity] = useState([]);
  const [Fname, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [packets_detail, setpackets_detail] = useState([
    { packet_name: "", pair_base_unit: "" },
  ]);
  const [storeid, setStoreId] = useState("");
  const [selectedimage, setSelectedImage] = useState("");
  const [imageEntity, setImageEntity] = useState([]);
  const [update, setupdate] = useState(false);
  const [imgsrc, setImgsrc] = useState("");
  const [imgPreview, setimgPreview] = useState(false);
  const [imguploader, setimguploader] = useState(false);
  const [StoreData, setStoreData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const [FilterStockData, setFilterStockData] = useState([]);

    
    const searchItem = (e) => {
        var allData = FilterStockData;
        setStoreData(FilterStockData);
        var filteredData = allData.filter((obj) => {
            var data = Object.keys(obj)
                .filter((key) => obj[key].toString().toLowerCase().includes(e))
                .reduce((cur, key) => {
                    return Object.assign(cur, { [key]: obj[key] });
                }, {});
            if (Object.keys(data).length !== 0) {
                return obj;
            }
        });
        setStoreData(filteredData);
    };
    
  const Get_StoreAccount = () => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/Store/GetStore",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config).then(function (response) {
      setStoreData(response.data)
      setFilterStockData(response.data);
      setisLoading(false);
    });
  };

  //  const Navigation_id =(key)=>{

  //  navigation('/AddStoreAccess',{state:{id:key} })

  //  }

  const inputRef = useRef(null);
  const ref = useRef(null);
  const location = useLocation();

  //  Upload Store data
  const UploadStore = () => {
    var axios = require("axios");
    if (
      accountvalue === "" ||
      storevalue === "" ||
      consumptionvalue === "" ||
      unit === "" ||
      quantity_grams === "" ||
      Opening_quantity === "" ||
      packets_detail === ""
    ) {
      setIsValidateAllStates(false);
    } else {
      var data = JSON.stringify({
        store_type_id: storevalue.value,
        item_name: accountvalue,
        store_consumption_id: consumptionvalue.value,
        store_unit_id: unit.value,
        quantity_in_grams: quantity_grams,
        Opening_quantity: Opening_quantity,
        descriptions: Description,
        image: imageEntity.toString(),
        attachemnts_paths: fileEntity.join(",").toString(),
        packets_details: packets_detail,
      });
      var config = {
        method: "post",
        url: "http://rightway-api.genial365.com/api/Store/AddStore",
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem("access_token")).access_token
          }`,
          "Content-Type": "application/json",
        },

        data: data,
      };
    }

    axios(config).then(function (response) {
      setAccountvalue("");
      setstorevalue("");
      setConsumptionValue("");
      setUnit("");
      setDescription("");
      setOpening_quantity("");
      setQuantity_grams("");
      setpackets_detail([{ packet_name: "", pair_base_unit: "" }]);
      setFileEntity([]);
      Get_StoreAccount();
      setImageEntity([])
      setimgPreview(false)
      toast.success("Your response has been submitted successfully");
    });
  };

  // Fetch Store Data by Id

  const FetchDataforEdit = (id) => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: `http://rightway-api.genial365.com/api/Store/GetStoreById?store_info_id=${id}`,
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const id = response.data.store_account.store_account_value;
        setStoreId(id);

        setDescription(response.data.descriptoion);
        setAccountvalue(response.data.store_account.store_account_label);
        setOpening_quantity(response.data.entries.opening_quantity);
        setQuantity_grams(response.data.quantity_in_grams);
        setpackets_detail(response.data.packets_details);

        const StoreData = {
          label: response.data.store_type.stock_type_label,
          value: response.data.store_type.stock_type_value,
          code: response.data.store_type.stock_type_code,
        };

        const Consumption = {
          label: response.data.consumption_account.account_label,
          value: response.data.consumption_account.account_value,
          code: response.data.store_type.store_type_code,
        };

        const Unit = {
          label: response.data.store_account.store_unit_name,
        };
        setstorevalue(StoreData);
        setConsumptionValue(Consumption);
        setUnit(Unit);

        if (response.data.attachments !== "") {
          setFileEntity(response.data.attachments.split(","));
        }
        setSelectedFile(response.data.attachments.split(","));

        if (response.data.image !== "") {
          setImageEntity(response.data.image.toString());
        }
        setSelectedImage(response.data.image.toString());

        setupdate(true);
      })
      .catch(function (error) {});
  };

  //  Update Store Data by Id

  const UpdateStore = (id) => {
    var axios = require("axios");
    var data = JSON.stringify({
      store_type_id: storevalue.value,
      item_name: accountvalue,
      store_consumption_id: consumptionvalue.value,
      store_unit_id: unit.value,
      quantity_in_grams: quantity_grams,
      entries: Opening_quantity,
      descriptions: Description,
      image: imageEntity.toString(),
      attachemnts_paths: fileEntity.join(",").toString(),
      packets_details: packets_detail,
    });
    var config = {
      method: "put",
      url: `http://rightway-api.genial365.com/api/Store/PutData?store_id=${id}`,
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
        "Content-Type": "application/json",
      },

      data: data,
    };

    axios(config)
      .then(function (response) {
        setAccountvalue("");
        setstorevalue("");
        setConsumptionValue("");
        setUnit("");
        setDescription("");
        setOpening_quantity("");
        setQuantity_grams("");
        setpackets_detail([{ packet_name: "", pair_base_unit: "" }]);
        setFileEntity([]);
        setupdate(false);
        Get_StoreAccount();
        setimgPreview(false)
        toast.success("Your response has been Updated successfully");
      })
      .catch(function (error) {
        toast.error("stock unit Entry Is missig");
      });
  };
  const reset = () => {
    ref.current.value = "";
  };
  const reset2 = () => {
    inputRef.current.value = "";
  };

  const UploadFile = async (e) => {
    setIsUpload(true);
    const options = {
      onUploadProgerss: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percentage = Math.floor((loaded * 100) / total);
        console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
      },
    };
    let data = new FormData();
    data.append("UploadedImage", selectedFile);
    await axios
      .post(
        `${endPoint}/api/FileUpload?file_name=${selectedFile.name}`,
        data,
        options
      )
      .then((res) => {
        setFileEntity([...fileEntity, res.data]);
        if (res.status === 200) {
          setIsUpload(false);
          reset();
        }
      });
  };

  const UploadImage = async () => {
    setimguploader(true);
    const options = {
      onUploadProgerss: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percentage = Math.floor((loaded * 100) / total);
        console.log(`${loaded}bytes of ${total}bytes | ${percentage}%`);
      },
    };
    let data = new FormData();
    data.append("UploadedImage", selectedimage);
    await axios
      .post(
        `http://rightway-api.genial365.com/api/FileUpload?file_name=${selectedimage.name}`,
        data,
        options
      )
      .then((res) => {
        setImageEntity([...imageEntity, res.data]);
        if (res.status === 200) {
          setimgPreview(true);
          setimguploader(false);
          reset2();
        }
      });
  };

  let handleChange = (i, e) => {
    const { name, value } = e.target;
    const list = [...packets_detail];
    list[i][name] = value;
    setpackets_detail(list);
  };

  let addFormFields = () => {
    setpackets_detail([
      ...packets_detail,
      { packet_title: "", pair_base_unit: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...packets_detail];

    // at position i remove 1 element
    newFormValues.splice(i, 1);
    setpackets_detail(newFormValues);
  };
  let removeAttchments = (i) => {
    let newAttachValues = [...fileEntity];
    // at position i remove 1 element
    newAttachValues.splice(i, 1);
    setFileEntity(newAttachValues);
  };

  const AttachmentFileHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const Getstore_type = () => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/Store/GetStoreAccount",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config).then(function (response) {
      setstoreoption(
        response.data.map((item) => {
          return {
            value: item.stock_value,
            label: item.stock_label,
          };
        })
      );
    });
  };

  // get method of consumption
  const Get_Consumption = () => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://rightway-api.genial365.com/api/Store/GetStore/ConsumtionAccount",
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
      data: data,
    };

    axios(config).then(function (response) {
      setConsumptionOption(
        response.data.map((item) => {
          return {
            value: item.chart_id,
            label: item.account_name,
            code: item.account_code,
          };
        })
      );
    });
  };

  const Get_Unit = (APIurl) => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: APIurl,
      headers: {
        Authorization: `bearer ${
          JSON.parse(localStorage.getItem("access_token")).access_token
        }`,
      },
    };

    axios(config).then(function (response) {
      setUnitOption(
        response.data.map((item) => {
          return {
            value: item.stock_unit_id,
            label: item.stock_unit_name,
            created_date: item.created_date,
            modified_date: item.modified_date,
          };
        })
      );
    });
  };
  const cancel = () => {
    setAccountvalue("");
    setstorevalue("");
    setConsumptionValue("");
    setUnit("");
    setDescription("");
    setOpening_quantity("");
    setQuantity_grams("");
    setpackets_detail([{ packet_name: "", pair_base_unit: "" }]);
    setFileEntity([]);
    setupdate(false);
    Get_StoreAccount();
  };

  useEffect(() => {
    Getstore_type();
    Get_Consumption();
    Get_Unit("http://rightway-api.genial365.com/api/StockUnits/GetData");
    // if (location?.state?.id) {
    //   FetchDataforEdit(location.state.id)
    // }
    Get_StoreAccount();
  }, []);

  return (
    <>
      <div
        className={`container-fluid right_col  page-title-bar ${
          showNavMenu === false ? "right_col-margin-remove" : ""
        }   `}
      >
        <CustomInnerHeader
          moduleName="Store Management"
          isShowSelector={true}
        />
      </div>
      <div
        className={`right_col  h-10 heightFixForFAult  ${
          showNavMenu === false ? "right_col-margin-remove" : " "
        } `}
        role="main"
      >
        <div className="row">
          <div className="col-md-12 ">
            <div className="x_panel px-0">
              <div className="x_content  p-4  ">
                <span className="section">
                  <div className="row px-2  ">
                    <div className="col-8 ">
                      <i className="fa fa-edit"></i>&nbsp;Add Store Account
                    </div>
                  </div>
                </span>
                <div className="form-group">
                  {/*row...1*/}
                  <div className="row px-4">
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        {" "}
                        Store Type <span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <Select
                          isSearchable={true}
                          options={storeoption}
                          value={storevalue}
                          styles={customStyles}
                          isDisabled={location?.state?.id ? true : false}
                          style={{ minHeight: "29px", height: "29px" }}
                          onChange={(e) => {
                            setstorevalue(e);
                          }}
                        />
                        {!isValidateAllStates && storevalue === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-4 col-sm-4 label-align">
                        {" "}
                        Consumption Account<span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <Select
                          isSearchable={true}
                          options={consumptionoption}
                          value={consumptionvalue}
                          styles={customStyles}
                          onChange={(e) => {
                            setConsumptionValue(e);
                          }}
                        />
                        {!isValidateAllStates && consumptionvalue === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/*row...2*/}
                  <div className="row px-4 mt-2">
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        {" "}
                        Account name <span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          value={accountvalue}
                          onChange={(e) => {
                            setAccountvalue(e.target.value);
                          }}
                        />
                        {!isValidateAllStates && accountvalue === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-4 col-sm-4 label-align">
                        {" "}
                        Quantity in grams <span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={quantity_grams}
                          onChange={(e) => {
                            setQuantity_grams(e.target.value);
                          }}
                        />
                        {!isValidateAllStates && quantity_grams === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/*row...3*/}
                  <div className="row px-4 mt-2">
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Unit <span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <Select
                          isSearchable={true}
                          options={unitoption}
                          value={unit}
                          styles={customStyles}
                          onChange={(e) => {
                            setUnit(e);
                          }}
                        />
                        {!isValidateAllStates && unit === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-4 col-sm-4 label-align">
                        {" "}
                        Opening Quantity <span className="required">*</span>
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={Opening_quantity}
                          onChange={(e) => {
                            setOpening_quantity(e.target.value);
                          }}
                        />
                        {!isValidateAllStates && Opening_quantity === "" && (
                          <span className="text-danger">
                            First Select this{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row px-4 mt-2">
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        {" "}
                        Select Attachments 
                      </label>
                      <div className="col-md-7">
                        <input
                          ref={ref}
                          type="file"
                          className="form-control form-control-sm customStyleForInput"
                          data-validate-length-range={6}
                          data-validate-words={2}
                          name="name"
                          onChange={(e) => {
                            AttachmentFileHandler(e);
                            setFilename(e.target.files[0].name.split(".")[0]);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-1  "
                        style={{ paddingTop: "1.5px" }}
                      >
                        {isupload ? (
                          <div
                            className="spinner-border  text-customOrange "
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <button
                            disabled={ref?.current?.value === "" ? true : false}
                            className="btn btn-sm btn-outline-success "
                            onClick={() => UploadFile()}
                            type="button"
                          >
                            <i className="fa fa-upload"></i>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-4 col-sm-4 label-align">
                        {" "}
                        Select Image <span className="required">*</span>
                      </label>
                      <div className="col-md-7">
                        <input
                          type="file"
                          className="form-control form-control-sm customStyleForInput"
                          data-validate-length-range={6}
                          data-validate-words={2}
                          name="name"
                          accept="image/*"
                          ref={inputRef}
                          onChange={(e) => {
                            setImgsrc(URL.createObjectURL(e.target.files[0]));
                            setSelectedImage(e.target.files[0]);
                          }}
                        />
                      </div>
                      <div
                        className="col-md-1  "
                        style={{ paddingTop: "1.5px" }}
                      >
                        {imguploader ? (
                          <div
                            className="spinner-border  text-customOrange "
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <button
                            disabled={
                              inputRef?.current?.value === "" ? true : false
                            }
                            className="btn btn-sm btn-outline-success "
                            onClick={() => UploadImage()}
                            type="button"
                          >
                            <i className="fa fa-upload"></i>
                          </button>
                        )}
                      </div>
                      <div
                        className="col-md-2  "
                        style={{ paddingTop: "1.5px" }}
                      >
                        {imgPreview ? (
                          <img
                            className="my-0"
                            width="50"
                            height="35"
                            src={imgsrc}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/*attachments*/}

                  <div className="row px-4 mt-2">
                    <div className="col-md-6 col-sm-6">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Description
                      </label>
                      <div className="col-md-8">
                        <textarea
                          className="form-control"
                          value={Description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    {fileEntity.length !== 0 && (
                      <div className="field item form-group col-md-6 col-sm-6">
                        <label className="col-form-label col-md-3 col-sm-3 label-align">
                          Attachments
                        </label>
                        <div className="col-md-8 col-sm-8 ">
                          {fileEntity.map((each_file, index) => {
                            return (
                              <button className="btn btn-sm  bg-info  text-light">
                                <a
                                  href={`${endPoint + each_file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-light
          
            "
                                >
                                  {each_file.split("_")[0].slice(15)}{" "}
                                  {index + 1}
                                </a>
                                <i
                                  className="fa fa-times   text-light ml-1 "
                                  aria-hidden="true"
                                  onClick={() => removeAttchments(index)}
                                ></i>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="section mt-4">
                    <div className="row px-2  ">
                      <div className="col-8 ">
                        <i className="fa fa-edit"></i>&nbsp;Add Store Packets
                      </div>
                    </div>
                  </span>
                  <div className="row">
                    <div className="col-md-12 ">
                      <table className="table table-striped jambo_table bulk_action ">
                        <thead>
                          <tr className="headings reportTableHead">
                            <th className="column-title   ">Packet Name</th>
                            <th className="column-title   ">Pair Base unit</th>
                            <th className="column-title   ">&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {packets_detail.map((element, index) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="packet_name"
                                      value={element.packet_name}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                    {!isValidateAllStates &&
                                      element.packet_name === "" && (
                                        <span className="text-danger">
                                          First Select this{" "}
                                        </span>
                                      )}
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      name="pair_base_unit"
                                      min="0"
                                      value={element.pair_base_unit}
                                      onChange={(e) => handleChange(index, e)}
                                    />
                                    {!isValidateAllStates &&
                                      element.pair_base_unit === "" && (
                                        <span className="text-danger">
                                          First Select this{" "}
                                        </span>
                                      )}
                                  </td>
                                  <td>
                                    <i
                                      class="fa fa-times pt-2 text-danger"
                                      aria-hidden="true"
                                      onClick={() => removeFormFields(index)}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row px-2 text-right ">
                    <div className="col-md-12 d-flex justify-content-between x_footer mt-4">
                      <button
                        className="btn  ms-4 text-white text-right"
                        style={{ backgroundColor: "#f79c74" }}
                        onClick={() => addFormFields()}
                      >
                        {" "}
                        Add line{" "}
                      </button>
                      {update ? (
                        <>
                          <div>
                            <button
                              className="btn  ms-4 text-white text-right bg-customBlue "
                              onClick={() => cancel()}
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                            <button
                              className="btn  ms-4 text-white text-right "
                              style={{ backgroundColor: "#f79c74" }}
                              onClick={() => {
                                UpdateStore(storeid);
                                // navigation(-1)
                              }}
                            >
                              {" "}
                              Update{" "}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <button
                              className="btn  ms-4 text-white text-right bg-customBlue "
                              onClick={() => cancel()}
                            >
                              {" "}
                              Cancel{" "}
                            </button>

                            <button
                              className="btn  ms-4 text-white text-right "
                              style={{ backgroundColor: "#f79c74" }}
                              onClick={() => UploadStore()}
                            >
                              {" "}
                              Submit{" "}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* pakages */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Available store */}
        <div className="x_panel  ">
          <div className="x_content">
            <span className="section pl-3">
              <div className="row   pt-3">
                <div className="col-6">
                  <i className="fa fa-list"></i>&nbsp;Listing
                </div>
                <div className="col-6 ">
                <div className='col-6 text-right'>
                <label>search:</label>
                </div>
                <div className='col-6 text-right'>
                <input
                className="form-control"
                type="text"
                placeholder='seach ...'
                onChange={(e) => searchItem(e.target.value)}
                />
                </div>
                 
                  
              
                </div>
              </div>
            </span>
            <div className="table-responsive px-3 pb-2" style={{ overflow: 'scroll' ,height: '400px'}}>
              <table className="table table-striped jambo_table bulk_action">
                <thead style={{position: 'sticky', top: '0',zIndex: '1'}}>
                  <tr className="headings reportTableHead">
                    <th
                      className="column-title  right-border-1 text-center"
                      width="10%"
                    >
                      {" "}
                      Sr.{" "}
                    </th>
                    <th
                      className="column-title  right-border-1 text-center"
                      width="14%"
                    >
                      {" "}
                      Name{" "}
                    </th>
                    <th
                      className="column-title  right-border-1 text-center"
                      width="24%"
                    >
                      Code
                    </th>
                    <th
                      className="column-title  right-border-1 text-center"
                      width="10%"
                    >
                      Unit
                    </th>
                    <th className="column-title text-center" width="10%">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {StoreData.map((item, index) => {
                    return (
                      <>
                        <tr className="even pointer">
                          <td className="">{index + 1}</td>
                          <td className="">
                            {item.store_account.store_account_label}
                          </td>
                          <td className="">
                            {item.store_account.store_account_code}{" "}
                          </td>
                          <td className="text-center">
                            {item.store_account.store_unit_name}{" "}
                          </td>
                          <td className="a-right a-right     text-center">
                            <i
                              className="fa fa-edit pl-3"
                              // data-toggle="modal" data-target=".bd-example-modal-xl"
                              onClick={() =>
                                FetchDataforEdit(item.store_info_id)
                              }
                            ></i>
                            <i className="fa fa-trash-o pl-3"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStore;
