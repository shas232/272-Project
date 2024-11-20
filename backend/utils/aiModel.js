const axios = require('axios');

// Hugging Face API URL and Token
const HF_API_URL = "https://api-inference.huggingface.co/models/bert-base-uncased";
const HF_API_TOKEN = "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"; // Ensure this token is valid

/**
 * Predict the masked word using Hugging Face model
 */
const predictMaskedWord = async () => {
  // Input sentence with a [MASK] token
  const input = { inputs: "Hugging Face is creating a [MASK] ecosystem." };

  try {
    // Make a POST request to Hugging Face API
    const response = await axios.post(
      HF_API_URL,
      input,
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json", // Explicitly set Content-Type
        },
      }
    );

    // Log predictions
    console.log("Predictions:", response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    } else {
      console.error("Request Error:", error.message);
    }
    return { error: "Model failed to process" };
  }
};

// Call the function
predictMaskedWord();
