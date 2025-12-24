const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Hàm gửi thông báo
const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  try {
    if (!fcmToken) return;

    const message = {
      notification: {
        title,
        body,
      },
      data,
      token: fcmToken,
    };

    const response = await admin.messaging().send(message);
    console.log("🔥 Đã gửi thông báo thành công:", response);
  } catch (error) {
    console.error("❌ Lỗi gửi thông báo:", error);
  }
};

module.exports = { admin, sendPushNotification };
