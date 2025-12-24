const { contract } = require("./utils/signer"); // Lấy contract instance
const Product = require("../models/Product"); // Lấy Model MongoDB

const setupEventListeners = () => {
  console.log("🎧 Kích hoạt chế độ lắng nghe sự kiện Blockchain...");

  // 1. Sự kiện: Moderator DUYỆT Gieo Trồng
  // Event trong Solidity: event PlantingApproved(string indexed productId);
  contract.on("PlantingApproved", async (productId) => {
    const pid = productId.toString();
    console.log(`⚡ EVENT: PlantingApproved - ID: ${productId}`);
    try {
      await Product.findOneAndUpdate(
        { productId: pid },
        {
          plantingStatus: 1,
          statusCode: 1, // Đang canh tác
        }
      );
      console.log(
        `✅ DB Updated: Sản phẩm ${productId} đã được duyệt gieo trồng.`
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật DB:", err);
    }
  });

  // 2. Sự kiện: Moderator TỪ CHỐI Gieo Trồng
  contract.on("PlantingRejected", async (productId) => {
    const pid = productId.toString();
    console.log(`⚡ EVENT: PlantingRejected - ID: ${productId}`);
    try {
      await Product.findOneAndUpdate(
        { productId: pid },
        {
          plantingStatus: 2,
          statusCode: 0, // Quay về pending hoặc trạng thái lỗi
        }
      );
      console.log(
        `✅ DB Updated: Sản phẩm ${productId} bị từ chối gieo trồng.`
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật DB:", err);
    }
  });

  // 3. Sự kiện: Moderator DUYỆT Thu Hoạch
  contract.on("HarvestApproved", async (productId) => {
    const pid = productId.toString();
    console.log(`⚡ EVENT: HarvestApproved - ID: ${productId}`);
    try {
      await Product.findOneAndUpdate(
        { productId: pid },
        {
          harvestStatus: 1,
          statusCode: 2, // Đã thu hoạch
        }
      );
      console.log(
        `✅ DB Updated: Sản phẩm ${productId} đã được duyệt thu hoạch.`
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật DB:", err);
    }
  });

  // 4. Sự kiện: Nhà vận chuyển NHẬN HÀNG
  // Event: event ReceiveUpdated(string indexed productId, string transporterName, ...);
  contract.on(
    "ReceiveUpdated",
    async (productId, transporterName, receiveDate) => {
      const pid = productId.toString();
      console.log(`⚡ EVENT: ReceiveUpdated - ID: ${productId}`);
      try {
        await Product.findOneAndUpdate(
          { productId: pid },
          {
            isReceived: true,
            transporterName: transporterName,
            statusCode: 2, // Vẫn đang trong quá trình xử lý/vận chuyển
          }
        );
        console.log(
          `✅ DB Updated: Sản phẩm ${productId} đang được vận chuyển bởi ${transporterName}.`
        );
      } catch (err) {
        console.error("❌ Lỗi cập nhật DB:", err);
      }
    }
  );

  // 5. Sự kiện: Nhà vận chuyển GIAO HÀNG
  contract.on("DeliveryUpdated", async (productId) => {
    const pid = productId.toString();
    console.log(`⚡ EVENT: DeliveryUpdated - ID: ${productId}`);
    try {
      await Product.findOneAndUpdate(
        { productId: pid },
        {
          isDelivered: true,
          statusCode: 3, // Đã lên kệ / Sẵn sàng bán
        }
      );
      console.log(
        `✅ DB Updated: Sản phẩm ${productId} đã giao hàng thành công.`
      );
    } catch (err) {
      console.error("❌ Lỗi cập nhật DB:", err);
    }
  });
};

module.exports = setupEventListeners;
