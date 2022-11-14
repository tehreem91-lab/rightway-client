import {
    MyFilterTextInput,
    MyFilterSelect,
} from "./CustomFields";

function FilterForm(props) {
    return (
        <div className="x_panel">
            <div className="x_content">
                <span className="section">
                    <i className="fa fa-filter"></i>&nbsp;Filters
                </span>
                <div className="row">
                    {props.filterFields.map((data, index) => {
                        if (data.type === "select") {
                            // if (Object.keys(errors).length !== 0) {
                            //     errors.name = data.name;
                            // }
                            return (
                                <MyFilterSelect
                                    key={index}
                                    label={data.label}
                                    name={data.name}
                                    defaultValue={data.defaultValue}
                                    options={data.options}
                                    changeFilterFieldValue={props.changeFilterFieldValue}
                                    // setFieldValue={setFieldValue}
                                />
                            );
                        } else {
                            return (
                                <MyFilterTextInput
                                    key={index}
                                    label={data.label}
                                    name={data.name}
                                    type={data.type}
                                    placeholder={data.placeholder}
                                    changeFilterFieldValue={props.changeFilterFieldValue}
                                    // setFieldValue={setFieldValue}
                                />
                            );
                        }
                    })}
                </div>
            </div>

            <div className="col-md-12 text-right x_footer">
                {props.showFilterButtons && (
                    <>
                        <button className="btn btn-dark" type="button" onClick={() => props.clearFilterFields()}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit" onClick={() => props.filterFormSubmit()}>
                            Search
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
export default FilterForm;