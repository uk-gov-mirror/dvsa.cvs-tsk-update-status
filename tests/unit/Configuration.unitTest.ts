import {Configuration} from "../../src/utils/Configuration";

describe("The configuration service", () => {
    context("with good config file", () => {
        it("should return remote versions of the config by default", () => {
            process.env.BRANCH = "CVSB-XXX";
            const configService = Configuration.getInstance();
            const endpoints = configService.getEndpoints();
            expect(endpoints.functions.updateTechRecordStatus.name).toEqual("technical-records-CVSB-XXX");
        });
    });

});
