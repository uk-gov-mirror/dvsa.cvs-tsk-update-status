import {updateTechRecordStatus} from "../../src/functions/updateTechRecordStatus";

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
        it("should thrown an error", async () => {
            expect.assertions(1);
            try {
                await updateTechRecordStatus({otherStuff: "hi", Records: []} as any);
            } catch (err) {
                expect(err.message).toEqual("Event is empty");
            }
        });
    });
});
