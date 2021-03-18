const dateFormat = require('dateformat');
const _ = require('underscore');



var timestampToDate = function(times,formate = '',removets = false){
	var now = new Date();
	// console.log(times); 
	var timezoneoffset  = now.getTimezoneOffset();
	// console.log(timezoneoffset,"timezoneoffset");
	
	times = (removets)?(parseInt(times) + (parseInt(timezoneoffset)*60)):parseInt(times);
	if(times==0 || isNaN(times)) return '';
	
	var d = new Date( times * 1000 );
	// console.log(d);
	formate = (formate)?formate:"yyyy/mm/dd";
	if(formate ==="D"){
		var date  = d.getDay();
		date = (date ==0 )?7:date;
	}else{
		var date  = dateFormat(d, formate);
	}


	return date;
}



var  getTimestamp = async function(datetime,timezoneoffset=0) {
    if(datetime!== null){
        var date1 = new Date(datetime + ' GMT +0');

        var year = date1.getUTCFullYear();
        var month = date1.getUTCMonth();
        var date = date1.getUTCDate();
        var hours = date1.getUTCHours();
        var minus = date1.getUTCMinutes();
        var sec = date1.getUTCSeconds();
            //console.log(date1);
            //console.log(year+"|"+month+"|"+date+"|"+hours+"|"+minus);
        var utc = Date.UTC(year,month,date,hours,minus,sec);
        var datum = new Date(utc);
        var timsp = (datum.getTime()/1000); //console.log('BBB='+timsp);
        timsp =(datum.getTime()/1000) + (timezoneoffset*60); //console.log('AAA='+timsp);
        return timsp;
    }
}



module.exports = {
    timestampToDate,
    getTimestamp
}  