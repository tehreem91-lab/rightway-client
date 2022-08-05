
import axios from 'axios';
import { endPoint } from '../../config/Config';

const accessToken = localStorage.getItem("access_token");
export const updateTreeNodeData = (data) => async (dispatch) => {
  try {

    console.log(data, "action");


    if (data.editable !== null && data.editable === "true") {

      var config = {
        method: 'get',
        url: `${endPoint}api/ChartOfAccounts/GetCategoriesByLevel?level=${data.level - 1}`,
        headers: {
          'Authorization': "Bearer " + JSON.parse(accessToken).access_token,
        }
      };

      const optionsForSelector = await axios(config)
        .then(function (response) {

          let arr = [];
          response.data.map((eachCategory) => {
            console.log(eachCategory);
            if (eachCategory.level > 4) {
              arr.push({ value: eachCategory.chart_id, label: eachCategory.category_name, wholeData: eachCategory })
            } else {
              arr.push({ value: eachCategory.category_id, label: eachCategory.category_name, wholeData: eachCategory })
            }
          })
          return arr;

        })
        .catch(function (error) {
          console.log(error);
        });
      dispatch({ type: "UPDATE_TREE_NODE", payload: { ...data, optionsForSelector } });
    } else {
      dispatch({ type: "UPDATE_TREE_NODE", payload: null });
    }



  } catch (error) {
    console.log(error.message);
    dispatch({ type: "UPDATE_TREE_NODE", payload: null });

  }
};

export const fetchTreeNodeData = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_TREE_NODE" });
  } catch (error) {
    console.log(error.message);
  }
};




