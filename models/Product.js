const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  farmName: { type: String },
  farmOwner: { type: String }, // Tên chủ trại
  farmPhone: { type: String }, // SĐT chủ trại (Quan trọng để lọc)

  // Các trường trạng thái để lọc
  plantingStatus: { type: Number, default: 0 },
  harvestStatus: { type: Number, default: 0 },
  statusCode: { type: Number, default: 0 }, // 0: Pending, 1: Planting, 2: Harvested, 3: OnShelf, 4: Sold

  // Thông tin hiển thị nhanh
  plantingImageUrl: { type: String },
  plantingDate: { type: Number },
  harvestDate: { type: Number },

  // Thông tin vận chuyển/bán lẻ (để lọc cho Transporter/Retailer)
  transporterName: { type: String },
  isReceived: { type: Boolean, default: false }, // Đã nhận hàng chưa
  isDelivered: { type: Boolean, default: false }, // Đã giao hàng chưa
  price: { type: Number, default: 0 }, // Giá bán

  updatedAt: { type: Date, default: Date.now },

  quantity: { type: Number, default: 0 }, // Sản lượng
  unit: { type: String, default: "Kg" }, // Đơn vị (Kg, Tấn...)
  quality: { type: String, default: "Chưa kiểm định" }, // Chất lượng (VietGAP...)

  farmLocation: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String },
  },
});

module.exports = mongoose.model("Product", productSchema);
