
export default (nodeData = null, action) => {
  switch (action.type) {
    case "UPDATE_TREE_NODE": 
      return action.payload; 
    case "FETCH_TREE_NODE": 
        return nodeData;
    default:
      return nodeData;
  }
};
