import {handler} from "../../src/handler";
import event from "../resources/queue-event.json";
import {UpdateTechRecordService} from "../../src/services/UpdateTechRecordService";


context("When invoking the handler", () => {
    it("it should call the service with the correct parameters", async () => {
        UpdateTechRecordService.updateStatusByVin = jest.fn().mockReturnValue(Promise.resolve("test value"));
        const resp = await handler(event as any);
        expect(UpdateTechRecordService.updateStatusByVin).toHaveBeenCalledWith("XMGDE02FS0H012345", "submitted", "fail", "1", undefined);
    });
});
