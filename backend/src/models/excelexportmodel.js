const fs = require('fs');
const Excel = require('exceljs');
const dbfun = require('../config/dbconfig');
const moment = require('moment');
const path = require('path')
const common = require('../helper/common');
const routeUrl = require('../../app')




var exportExcelTaskList = async function (req, res) {
    try {
        let body = req.body;
        const exportDateRangeValue = body.exportDateRangeValue;

        let satrtdateConv =  moment(exportDateRangeValue.start,'MM/DD/YYYY').format('YYYY-MM-DD');
        
        let enddateConv =  moment(exportDateRangeValue.end, 'MM/DD/YYYY').format('YYYY-MM-DD');

        let start_time = satrtdateConv + ' 00:00';
        let start_timestamp = await common.getTimestamp(start_time);
        let end_time = enddateConv + ' 23:59:59';
        let end_timestamp = await common.getTimestamp(end_time);

        let timezoneoffset = moment().utcOffset()
        const currentDatetimestamp = moment(moment().format('YYYY-MM-DD hh:mm')).add(timezoneoffset, 'minutes').format('X');

        let responseSend = {
            status: ''
        }

        var dir = '.taskExcel/';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }


        const filename = "taskList_" + currentDatetimestamp + '.xlsx';
        const optionsBestCompression = {
            filename: dir + filename,
            useStyles: true
        };

        let taskListQry = `SELECT * FROM users as U JOIN task AS T ON T.iduser = U.iduser WHERE T.is_deleted = 0  AND (T.task_over_due_date>= ${start_timestamp} AND T.task_over_due_date <= ${end_timestamp}  )`;
        let taskList = await dbfun.selectAny(taskListQry);

        let excelColumn = [];
        if (taskList && taskList.length > 0) {
            const wb = new Excel.stream.xlsx.WorkbookWriter(optionsBestCompression);
            const ws = wb.addWorksheet('userData');

            excelColumn.push({ header: 'task name', width: 40, key: 'taskname', style: { numFmt: '@' } });
            excelColumn.push({ header: 'first name', width: 20, key: 'firstname', style: { numFmt: '@' } });
            excelColumn.push({ header: 'last name', width: 20, key: 'lastname', style: { numFmt: '@' } });
            excelColumn.push({ header: 'description', width: 20, key: 'description', style: { numFmt: '@' } });
            excelColumn.push({ header: 'task duedate', width: 20, key: 'task_due_date', style: { numFmt: 'dd/mm/yyyy' } });
            excelColumn.push({ header: 'created date', width: 20, key: 'created_t', style: { numFmt: 'dd/mm/yyyy' } });
            excelColumn.push({ header: 'completed', width: 10, key: 'iscompleted', style: { numFmt: '@' } });
           

            ws.columns = excelColumn;
            ws.getCell('A1').font = { bold: true };
            ws.getCell('B1').font = { bold: true };
            ws.getCell('C1').font = { bold: true };
            ws.getCell('D1').font = { bold: true };
            ws.getCell('E1').font = { bold: true };
            ws.getCell('F1').font = { bold: true };
            ws.getCell('G1').font = { bold: true };
            ws.getCell('H1').font = { bold: true };
         


            for (const task of taskList) {    
                let date = await common.timestampToDate(task.created_t, "yyyy-mm-dd", true);
                let task_over_due_date = await common.timestampToDate(task.task_over_due_date, "yyyy-mm-dd", true);

                        const rowData = {
                            taskname: task.name,
                            firstname : task.first_name,
                            lastname : task.last_name,
                            description: task.description,
                            task_due_date: task_over_due_date,
                            created_t: date,
                            iscompleted: task.is_completed == 0 ? 'No' : 'YES' 
                     
                        }
                        ws.addRow(rowData);
                    }
                    await wb.commit();
                    let filePath = path.join(__dirname, '../../taskExcel/') + filename;


                    responseSend.status = { url:
                        filePath, filename : filename} ;
                    return responseSend;
                   
        }

    } catch (error) {
        console.log(" error ", error);

    }

}


module.exports = {
    exportExcelTaskList
  }
