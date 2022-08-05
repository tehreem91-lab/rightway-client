export const customStyles = { 
    control: (provided, state, base) => ({
      ...provided,
      background: "#fff",
      borderColor: "#d9e4e8",
      borderRadius: "5px",
      minHeight: "29px",
      height: "29px",
  
      ...base,
      boxShadow: "none",
    }), 
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: "11px",
      height: "30px",
      padding: "0 6px",
      // background: '#fff',
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  };
  
 export  const customStylesDanger = {
   
    control: (provided, state, base) => ({
      ...provided,
      background: "#fff",
      borderColor: "red",
      borderRadius: "none",
      minHeight: "30px",
      height: "30px",
  
      ...base,
      boxShadow: "none",
    }), 
    valueContainer: (provided, state) => ({
      ...provided,
      fontSize: "11px",
      height: "30px",
      padding: "0 6px",
      // background: '#fff',
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "30px",
    }),
  
  }