import {LambdaService} from "./LambdaService";
import {Configuration} from "../utils/Configuration";
import {HTTPMethods} from "../models/enum";

export class UpdateTechRecordService {
    public static updateStatusByVin(vin: string, testStatus: string, testResult: string, testTypeId: number, newStatus: string) {
        const event = {
            path: "/vehicles/update-status/" + vin,
            pathParameters: {
                vin,
            },
            queryStringParameters: {
                testStatus,
                testResult,
                testTypeId,
                newStatus,
            },
            httpMethod: HTTPMethods.PUT,
            resource: "/vehicles/update-status/{vin}"
        };

        return LambdaService.invoke(Configuration.getInstance().getEndpoints().functions.updateTechRecordStatus.name, event);
    }
}
