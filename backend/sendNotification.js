const admin = require("firebase-admin");

const sendPushNotification = async (fcmToken, title, body) => {
    try {
        const message = {
            notification: {
                title,
                body,
            },
            token: fcmToken,
        };

        await admin.messaging().send(message);
        console.log("Push notification sent successfully");
    } catch (error) {
        console.error("Error sending push notification:", error);
    }
};

module.exports = sendPushNotification;