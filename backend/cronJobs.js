const cron = require("node-cron");
const User = require("./Model/Service_ProviderModel");

cron.schedule("0 6 * * *", async () => {
    try {
        const cutoffTime = new Date();
        cutoffTime.setDate(cutoffTime.getDate() - 1); 

        const result = await User.updateMany(
            { isAvailable: true, lastUpdated: { $lt: cutoffTime } },
            { $set: { isAvailable: false, servicePinCodes: [] } }
        );

        console.log(`${result.modifiedCount} users set to unavailable.`);
    } catch (error) {
        console.error("Error updating availability:", error);
    }
});

