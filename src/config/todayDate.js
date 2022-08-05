var day = new Date().toLocaleDateString(undefined, { day: "2-digit" });
// day.setDate(15)
var month = new Date().toLocaleDateString(undefined, { month: "2-digit" });
var year = new Date().toLocaleDateString(undefined, { year: "numeric" });
const dateToday = `${year}-${month}-${day}`;
export default dateToday; //javascript format 2022-07-29


export const dateFormaterForInput = (e) => {


    //28/07/2022 00:00:00 
    var date = new Date(`${e?.slice(3 ,5)}-${e?.slice(0 ,2)}-${e?.slice(6 ,10)}`); 
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear(); 
return   y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

 
}