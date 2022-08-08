import { endPoint } from '../../config/Config';
import axios from 'axios' 
export const doGetNavigation = (setShowMainLoader) => async (dispatch) => {
  try {



    const api = `${endPoint}api/navigation`;
    const token = `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token}`
    const data = await axios.get(api, { headers: { "Authorization": token } }).then(res => {  
      localStorage.setItem("selectedBranch_idValue", res?.data?.prefered_user_info?.branch_prefer?.value);
      localStorage.setItem("selectedBranch_idLabel", res?.data?.prefered_user_info?.branch_prefer?.label);
      localStorage.setItem("selectedFiscalYear_value", res?.data?.prefered_user_info?.fiscal_year_prefer?.value);
      localStorage.setItem("selectedFiscalYear_label", `${res?.data?.prefered_user_info?.fiscal_year_prefer?.start_year.slice(0 , 10)}__${res?.data?.prefered_user_info?.fiscal_year_prefer?.end_year.slice(0 , 10)} `);


      setShowMainLoader(false);
      return res.data;
    })
      .catch((error) => {
        console.log(error)
      });

    await dispatch({
      type: "GET_NAV",
      payload: data,
    })

  }
  catch (error) {
    // alert(error?.response?.data?.message)
  }
}
