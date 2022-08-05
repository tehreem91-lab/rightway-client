import Select from "react-select";
import { useEffect, useState } from "react";
import { useField } from "formik";
import { toast } from "react-toastify";

const customStyles = {
  control: (provided, state, base) => ({
    ...provided,
    border: "1px solid #c2cad8",
    borderRadius: "5px",
    minHeight: "30px",
    height: "30px",
    color: "#555",
    ...base,
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#f79c74" : "#555",
    background: "#fff",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    color: "#555",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

export const MyTextInput = ({ label, ...props }) => {
  var required = props.required;
  var setFieldValue = props.setFieldValue;
  var changeFieldValue = props.changeFieldValue;

  props.required = false;
  delete props.setFieldValue;
  delete props.changeFieldValue;

  const [field, meta] = useField(props);
  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="col-md-8 col-sm-8">
        <input
          className="form-control"
          {...field}
          {...props}
          onChange={(e) => {
            setFieldValue(props.name, e.target.value, false);
            changeFieldValue(props.name, e.target.value);
          }}
        />
        {meta.touched && meta.error && (
          <span className="text-danger">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }) => {
  var required = props.required;
  var setFieldValue = props.setFieldValue;
  var changeFieldValue = props.changeFieldValue;

  props.required = false;
  delete props.setFieldValue;
  delete props.changeFieldValue;
  const [field, meta] = useField(props);
  const [choice, setChoice] = useState(props.defaultValue);
  useEffect(() => {
    setChoice(props.defaultValue);
  }, [props.defaultValue]);
  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="col-md-8 col-sm-8">
        <Select
          {...field}
          {...props}
          value={choice}
          isSearchable={true}
          onChange={(e) => {
            setFieldValue(props.name, e.value, false);
            changeFieldValue(props.name, e.value);
            setChoice(e);
          }}
          styles={customStyles}
        />
        {meta.touched && meta.error && (
          <span className="text-danger">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export const MyTextArea = ({ label, ...props }) => {
  var required = props.required;
  var setFieldValue = props.setFieldValue;
  var changeFieldValue = props.changeFieldValue;

  props.required = false;
  delete props.setFieldValue;
  delete props.changeFieldValue;

  const [field, meta] = useField(props);
  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="col-md-8 col-sm-8">
        <textarea
          className="form-control"
          {...field}
          {...props}
          onChange={(e) => {
            setFieldValue(props.name, e.target.value, false);
            changeFieldValue(props.name, e.target.value);
          }}
        />
        {meta.touched && meta.error && (
          <span className="text-danger">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export const MyFileUpload = ({ label, ...props }) => {
  var required = props.required;
  var setFieldValue = props.setFieldValue;
  var changeFieldValue = props.changeFieldValue;
  var objFile = props.objFile;

  props.required = false;
  delete props.setFieldValue;
  delete props.changeFieldValue;
  delete props.objFile;

  const [field, meta] = useField(props);
  const [fileEntity, setFileEntity] = useState(Object);
  const [fileValue, setFileValue] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const URL = localStorage.getItem("authUser");

  useEffect(() => {
    setFileValue(objFile.value);
  }, [objFile.value]);

  useEffect(() => {
    setFileUploaded(false);
  }, [props.disabled]);

  const UploadLogo = () => {
    var myHeaders = new Headers();
    myHeaders.append("contentType", "false");
    myHeaders.append("processData", "false");
    var formdata = new FormData();
    formdata.append("UploadedImage", fileEntity.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    //   ///api/Employees/attach-files
    fetch(URL + "api/FileUpload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFieldValue(props.name, result, false);
        changeFieldValue(props.name, result);
        setFileValue(result);
        setFileUploaded(true);
        toast.success("Logo has been Uploaded Successfully");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="col-md-8 col-sm-8">
        <div className="col-md-11 col-sm-11 row">
          <input
            className="form-control"
            type="file"
            disabled={props.disabled}
            hidden={props.hidden}
            onChange={(e) => {
              setFileEntity(e);
            }}
          />
          {meta.touched && meta.error && (
            <span className="text-danger">{meta.error}</span>
          )}
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-sm btn-outline-success"
            disabled={props.disabled}
            onClick={() => UploadLogo()}
            type="button"
          >
            <i className="fa fa-upload"></i>
          </button>
        </div>
        <div className="col-md-12">
          <input
            className="form-control"
            {...field}
            {...props}
            hidden="hidden"
          />
        </div>
        {fileUploaded && (
          <span className="text-success">
            File Uploaded Successfully. Submit Form to Save File Permanently
          </span>
        )}
        {fileValue !== undefined && fileValue !== "" && !props.disabled && (
          <div className="col-md-12">
            <img
              src={URL + fileValue}
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const MyFilterTextInput = ({ label, ...props }) => {
  var required = props.required;
  var setFieldValue = props.setFieldValue;
  var changeFieldValue = props.changeFieldValue;

  props.required = false;
  delete props.setFieldValue;
  delete props.changeFieldValue;
  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="col-md-8 col-sm-8">
        <input
          className="form-control"
          {...props}
          onChange={(e) => {
            setFieldValue(props.name, e.target.value, false);
            changeFieldValue(props.name, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export const MyFilterSelect = ({ label, ...props }) => {
  var changeFilterFieldValue = props.changeFilterFieldValue;
  delete props.changeFilterFieldValue;
  const [choice, setChoice] = useState(props.defaultValue);
  useEffect(() => {
    setChoice(props.defaultValue);
  }, [props.defaultValue]);
  return (
    <div className="field item form-group col-md-6 col-sm-6">
      <label className="col-form-label col-md-3 col-sm-3 label-align">
        {label}
      </label>
      <div className="col-md-8 col-sm-8">
        <Select
          {...props}
          value={choice}
          isSearchable={true}
          onChange={(e) => changeFilterFieldValue(props.name, e.value)}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export const MySimpleSelect = ({ label, ...props }) => {
  var changeFilterFieldValue = props.changeFilterFieldValue;
  delete props.changeFilterFieldValue;
  const [choice, setChoice] = useState(props.defaultValue);
  useEffect(() => {
    setChoice(props.defaultValue);
  }, [props.defaultValue]);
  return (
    <Select
      {...props}
      // value={choice}
      isSearchable={true}
      onChange={(e) =>
        changeFilterFieldValue(props.name, e.value, props.totalListing)
      }
      styles={customStyles}
    />
  );
};
