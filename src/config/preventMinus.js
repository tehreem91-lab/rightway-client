export const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};


export const preventLowerDate =async (e) => {
         
    
      await  console.log("ja ja turja " , e.target.value)
   


};
