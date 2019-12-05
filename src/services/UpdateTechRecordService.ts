import {LambdaService} from "./LambdaService";
import {Configuration} from "../utils/Configuration";
import {HTTPMethods} from "../models/enum";

export class UpdateTechRecordService {
    public static updateStatusByVin(vin: string, newStatus: string) {

        const event = {
            path: "/vehicles/" + vin,
            queryStringParameters: {
                newStatus
            },
            pathParameters: {
                vin
            },
            httpMethod: HTTPMethods.POST,
            resource: "/vehicles/{vin}"
        };

        return LambdaService.invoke(Configuration.getInstance().getEndpoints().functions.updateTechRecordStatus.name, event);
    }
}
