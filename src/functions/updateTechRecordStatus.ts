import {SQSEvent, SQSRecord} from "aws-lambda";
import {UpdateTechRecordService} from "../services/UpdateTechRecordService";

export function updateTechRecordStatus(event: SQSEvent) {
    if (!event || !event.Records || !Array.isArray(event.Records) || !event.Records.length) {
        console.error("ERROR: event is not defined.");
        throw new Error("Event is empty");
    }

    const promisesArray: Array<Promise<any>> = [];

    event.Records.forEach((record: SQSRecord) => {
        const test = JSON.parse(record.body);
        const promise = UpdateTechRecordService.updateStatusByVin(test.vin,
            test.testStatus,
            test.testResult,
            test.testTypeId,
            test.newStatus)
            .then((response: any) => {
                console.log("updateStatusByVin returned the following response ", response);
            });
        promisesArray.push(promise);
    });

    return Promise.all(promisesArray)
        .catch((error: Error) => {
            console.error("an error occurred in the promises", error);
            throw error;
        });
}

