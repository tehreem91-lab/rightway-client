import React from 'react'

import { customStyles } from '../../../Components/reactCustomSelectStyle'
import Select from 'react-select'

export const CustomAccountFormOne = ({
    dropDownActions,
    fetchOptionsLevelWise,
    validationStateForOne,
    setTextFieldInput,
    submitData,
    setValidationStateForOne,
    setDropDownActions,
    textFieldInput }) => {
    return (
        <>
            <div className="row">
                <div className="field item form-group col-md-12 col-sm-12">
                    <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                    <div className="col-md-8 col-sm-8">
                        <Select
                            value={dropDownActions.level_1_value}
                            isSearchable={true}
                            onChange={async (e) => {
                                await fetchOptionsLevelWise(e.wholeDate.level, e)
                            }}
                            styles={customStyles}
                            options={dropDownActions.level_1}
                        />
                        {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="field item form-group col-md-12 col-sm-12">
                    <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                    <div className="col-md-8 col-sm-8">
                        <Select
                            value={dropDownActions.level_2_value}
                            isSearchable={true}
                            onChange={(e) => {
                                setDropDownActions({
                                    ...dropDownActions,
                                    level_2_value: e
                                })
                            }}
                            styles={customStyles}
                            options={dropDownActions.level_2}
                        />
                        {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                    </div>
                </div>
            </div>

            <div className="row mt-1 mx-1">
                <div className="col-md-4 text-right pt-1">Categories name</div>
                <div className="col-md-8 px-2">
                    <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                        onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                        value={textFieldInput}
                        onChange={(e) => setTextFieldInput(e.target.value)}
                    />
                    {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}

                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12 text-right px-1">
                    <button className="btn btn-primary mr-3 mt-2" onClick={() => {
                        if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || textFieldInput === "") {
                            setValidationStateForOne(true)
                        } else {
                            setValidationStateForOne(false)
                            submitData(dropDownActions.level_2_value)
                        }
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export const CustomAccountFormTwo = ({
     dropDownActions,
    fetchOptionsLevelWise,
    validationStateForOne,
    setValidationStateForOne,
    submitData,
    setDropDownActions,
    setTextFieldInput,
    textFieldInput
}) => {
    return <>
        <div className="row">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_1_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_1}
                    />
                    {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_2_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_2}
                    />
                    {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                <div className="col-md-8 col-sm-8">
                    <Select

                        value={dropDownActions.level_3_value}
                        isSearchable={true}
                        onChange={(e) => {
                            setDropDownActions({
                                ...dropDownActions,
                                level_3_value: e
                            })

                        }}
                        styles={customStyles}
                        options={dropDownActions.level_3}
                    />
                    {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1 mx-1">
            <div className="col-md-4 text-right pt-1">Categories name</div>
            <div className="col-md-8 px-2">
                <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                    onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                    value={textFieldInput}
                    onChange={(e) => setTextFieldInput(e.target.value)}
                />
                {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}
            </div>
        </div>
        <div className="row mt-1">
            <div className="col-md-12 text-right px-1">
                <button className="btn btn-primary mr-3 mt-2" onClick={() => {

                    if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || textFieldInput === "") {
                        setValidationStateForOne(true)
                    } else {
                        setValidationStateForOne(false)
                        submitData(dropDownActions.level_3_value)
                    }
                }



                }>
                    Submit
                </button>
            </div>
        </div>
    </>
}


export const CustomAccountFormThree = ({
    dropDownActions,
    fetchOptionsLevelWise,
    validationStateForOne,
    textFieldInput,
    setTextFieldInput,
    submitData,
    setDropDownActions,
    setValidationStateForOne
}) => {
    return <>
        <div className="row">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_1_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_1}
                    />
                    {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_2_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_2}
                    />
                    {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_3_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_3}

                    />
                    {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_4</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_4_value}
                        isSearchable={true}
                        onChange={(e) => {
                            setDropDownActions({
                                ...dropDownActions,
                                level_4_value: e
                            })

                        }}
                        styles={customStyles}
                        options={dropDownActions.level_4}
                    />
                    {validationStateForOne && dropDownActions.level_4_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1 mx-1">
            <div className="col-md-4 text-right pt-1">Account_Name</div>
            <div className="col-md-8 px-2">
                <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                    onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                    value={textFieldInput}
                    onChange={(e) => setTextFieldInput(e.target.value)}
                />
                {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}

            </div>
        </div>
        <div className="row mt-1">
            <div className="col-md-12 text-right px-1">
                <button className="btn btn-primary mr-3 mt-2" onClick={() => {
                    if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || dropDownActions.level_4_value === "" || textFieldInput === "") {
                        setValidationStateForOne(true)
                    } else {
                        setValidationStateForOne(false)
                        submitData(dropDownActions.level_4_value)
                    }

                }}>
                    Submit
                </button>
            </div>
        </div>
    </>
}

export const CustomAccountFormFour = ({
    dropDownActions,
    fetchOptionsLevelWise,
    validationStateForOne,
    textFieldInput,
    setTextFieldInput,
    submitData,
    setDropDownActions,
    setValidationStateForOne }) => {
    return <>
        <div className="row">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_1</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_1_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_1}
                    />
                    {validationStateForOne && dropDownActions.level_1_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_2</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_2_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_2}
                    />

                    {validationStateForOne && dropDownActions.level_2_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_3</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_3_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_3}

                    />

                    {validationStateForOne && dropDownActions.level_3_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>




        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Level_4</label>
                <div className="col-md-8 col-sm-8">
                    <Select
                        value={dropDownActions.level_4_value}
                        isSearchable={true}
                        onChange={async (e) => {
                            await fetchOptionsLevelWise(e.wholeDate.level, e)
                        }}
                        styles={customStyles}
                        options={dropDownActions.level_4}
                    />
                    {validationStateForOne && dropDownActions.level_4_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>


        <div className="row mt-1">
            <div className="field item form-group col-md-12 col-sm-12">
                <label className="col-form-label col-md-4 col-sm-4 label-align">Select Account</label>
                <div className="col-md-8 col-sm-8">
                    <Select

                        value={dropDownActions.level_5_value}
                        isSearchable={true}
                        onChange={(e) => {
                            setDropDownActions({
                                ...dropDownActions,
                                level_5_value: e
                            })

                        }}
                        styles={customStyles}
                        options={dropDownActions.level_5}
                    />
                    {validationStateForOne && dropDownActions.level_5_value === "" && <span className="text-danger">First Select this </span>}
                </div>
            </div>
        </div>
        <div className="row mt-1 mx-1">
            <div className="col-md-4 text-right pt-1">Sub Ladger</div>
            <div className="col-md-8 px-2">
                <input type="text" className='form-control form-control-sm ' placeholder='Enter Entity Name'
                    value={textFieldInput}
                    onInput={(er) => er.target.value = er.target.value.toUpperCase()}
                    onChange={(e) => setTextFieldInput(e.target.value)}

                />
                {validationStateForOne && textFieldInput === "" && <span className="text-danger">First Select this </span>}
            </div>
        </div>
        <div className="row mt-1">
            <div className="col-md-12 text-right px-1">
                <button className="btn btn-primary mr-3 mt-2" onClick={() => {
                    if (dropDownActions.level_1_value === "" || dropDownActions.level_2_value === "" || dropDownActions.level_3_value === "" || dropDownActions.level_4_value === "" || dropDownActions.level_5_value === "" || textFieldInput === "") {
                        setValidationStateForOne(true)
                    } else {
                        setValidationStateForOne(false)
                        submitData(dropDownActions.level_5_value)
                    }

                }}>
                    Submit
                </button>
            </div>
        </div>
    </>
}