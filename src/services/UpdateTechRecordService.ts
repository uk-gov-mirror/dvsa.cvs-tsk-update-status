import {LambdaService} from "./LambdaService";
import {Configuration} from "../utils/Configuration";
import {HTTPMethods} from "../models/enum";

export class UpdateTechRecordService {
    public static updateStatusBySystemNumber(systemNumber: string, testStatus: string, testResult: string, testTypeId: number, newStatus: string) {
        const event = {
            path: "/vehicles/update-status/" + systemNumber,
            pathParameters: {
                systemNumber,
            },
            queryStringParameters: {
                testStatus,
                testResult,
                testTypeId,
                newStatus,
            },
            httpMethod: HTTPMethods.PUT,
            resource: "/vehicles/update-status/{sysNum}"
        };

        return LambdaService.invoke(Configuration.getInstance().getEndpoints().functions.updateTechRecordStatus.name, event);
    }
}
