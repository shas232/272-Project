const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  isFraudulent: { type: Boolean, required: true },
  explanation: { type: String, required: true },
});

const officeSuppliesSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  vendor: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  department: { 
    type: String, 
    required: true
  },
  purpose: { type: String, required: true },
  receipts: { type: [String], default: [] }, // Store file paths or URLs for receipts
  analysis: { 
    type: analysisSchema, 
    default: { isFraudulent: false, explanation: 'Not analyzed yet' } 
  },
});

const OfficeSupplies = mongoose.model('OfficeSupplies', officeSuppliesSchema);
module.exports = OfficeSupplies;
