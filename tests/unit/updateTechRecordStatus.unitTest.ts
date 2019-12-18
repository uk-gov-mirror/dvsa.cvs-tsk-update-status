import {updateTechRecordStatus} from "../../src/functions/updateTechRecordStatus";
import event from "../resources/queue-event.json";
import {LambdaService} from "../../src/services/LambdaService";

context("when a failing test result is read from the queue", () => {
    context("and the event is empty", () => {
        it("should thrown an error", async () => {
            expect.assertions(1);
            try {
                await updateTechRecordStatus({} as any);
            } catch (err) {
                expect(err.message).toEqual("Event is empty");
            }
        });
    });

    context("and the event has no records", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await updateTechRecordStatus({otherStuff: "hi", Records: []} as any);
            } catch (err) {
                expect(err.message).toEqual("Event is empty");
            }
        });
    });
});

context("when invoking the function with a correct event", () => {
    it("should correctly process the record", async () => {
        LambdaService.invoke = jest.fn().mockReturnValue(Promise.resolve("test value"));
        expect.assertions(2);
        const resp = await updateTechRecordStatus(event as any);
        expect(resp).toEqual(["test value"]);
        expect(LambdaService.invoke).toHaveBeenCalledTimes(1);
    });

    it("should how an error if the lambda call is not successful", async () => {
        LambdaService.invoke = jest.fn().mockReturnValue(Promise.reject("error value"));
        await expect(updateTechRecordStatus(event as any)).rejects.toEqual("error value");
    });
});
