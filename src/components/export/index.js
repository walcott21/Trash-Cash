import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style"

export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(formatInput(apiData.trashCollected.data, apiData.collectionPoints.data));
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    const formatInput = (trashCollected, collectionPoints) => {
        console.log(collectionPoints)
        return trashCollected.map(trash => {
            const collectionPointAddress = collectionPoints.filter(item => item._id == trash.collection_point_id)[0]
            return {
                _id: trash._id,
                type: trash.type,
                weight: trash.weight,
                user_id: trash.user_id,
                collection_point: collectionPointAddress.address,
                date: new Date(trash.date * 1000)
            }
        })
    }

    return (
        <Button 
            variant="contained" 
            color="success"
            fullWidth
            endIcon={<FontAwesomeIcon icon={faFileExport} />}
            onClick={(e) => exportToCSV(apiData, fileName)}
        >Export</Button>
    );
};