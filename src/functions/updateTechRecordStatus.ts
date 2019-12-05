import {SQSEvent, SQSRecord} from "aws-lambda";
import {UpdateTechRecordService} from "../services/UpdateTechRecordService";

export async function updateTechRecordStatus(event: SQSEvent) {
    if (!event || !event.Records || !Array.isArray(event.Records) || !event.Records.length) {
        console.error("ERROR: event is not defined.");
        throw new Error("Event is empty");
    }

    event.Records.forEach((record: SQSRecord) => {
        const data = JSON.parse(record.body);
        UpdateTechRecordService.updateStatusByVin(data.vin, data.newStatus);
    });
}

