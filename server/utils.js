
function getDateIsSimpleForm(dateObj){
     const date= new Date(dateObj);

     return date.toISOString().toString().split('T')[0];
}

function dayDiffFromrToday(date){
const today = new Date().getTime();
const prev= new Date(date).getTime();
return (today-prev)/(24*60*60*1000);
}


module.exports={getDateIsSimpleForm,dayDiffFromrToday}