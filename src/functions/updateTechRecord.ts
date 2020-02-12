import {SQSEvent, SQSRecord} from "aws-lambda";
import {UpdateTechRecordService} from "../services/UpdateTechRecordService";

export function updateTechRecord(event: SQSEvent) {
    if (!event || !event.Records || !Array.isArray(event.Records) || !event.Records.length) {
        throw new Error("Event is empty");
    }

    const promisesArray: Array<Promise<any>> = [];

    event.Records.forEach((record: SQSRecord) => {
        const test = JSON.parse(record.body);
        const promiseUpdateStatus = UpdateTechRecordService.updateStatusBySystemNumber(test.systemNumber,
            test.testStatus,
            test.testTypes.testResult,
            test.testTypes.testTypeId,
            test.newStatus);
        if (test.euVehicleCategory) {
            const promiseUpdateEuCategory = UpdateTechRecordService.updateEuVehicleCategory(test.vin, test.euVehicleCategory);
            promisesArray.push(promiseUpdateEuCategory);
        }
        promisesArray.push(promiseUpdateStatus);
    });

    return Promise.all(promisesArray)
        .catch((error: Error) => {
            console.error("an error occurred in the promises", error);
            throw error;
        });
}

