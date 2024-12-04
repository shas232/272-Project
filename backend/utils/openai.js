const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
});

 async function analyzeExpense(expenseData) {
  try {
    let prompt;

    // Determine the type of expense and build the appropriate prompt
    switch (expenseData.type) {
      case 'travel':
        prompt = `Analyze this travel expense for potential fraud. Use the following criteria:
        
        - Verify if the locations (${expenseData.departureLocation} to ${expenseData.destination}) exist and make sense geographically.
        - Check if travel dates departure date: (${expenseData.departureDate} to return date: ${expenseData.returnDate}) are logical and within reasonable timeframes. if return date is > departture date, tell its fraud.
        - If the total amount (${expenseData.totalAmount}) is significantly less than typical ranges for the route and duration, mark it as budget-friendly and non-fraudulent.
        - Consider the business purpose (${expenseData.purpose}) and determine if it justifies the expense.
        - Look for unusual patterns or discrepancies in the expense details.

        Provide a detailed analysis with specific reasons for your decision.`;
        break;

      case 'meals':
        prompt = `Analyze this meal expense for potential fraud. Use the following criteria:

        - Verify if the restaurant (${expenseData.restaurantName}) exists and if it's reasonable for the business purpose.
        - Check if the meal date (${expenseData.date}) aligns with the business timeline.
        - Consider the number of attendees (${expenseData.numberOfAttendees}) and the meal type (${expenseData.mealType}).
        - Evaluate the total amount (${expenseData.totalAmount}) and determine if it's within a typical range for the meal type and attendees.
        - Assess whether the attendees (${expenseData.attendeeNames}) match the expected business context for the meal.
        - Ensure that the purpose of the meal (${expenseData.purpose}) is appropriate for the expense.

        Provide a detailed analysis with specific reasons for your decision.`;
        break;

      case 'officeSupplies':
        prompt = `Analyze this office supplies expense for potential fraud. Use the following criteria:
        
        - Verify if the quantities (${expenseData.quantity}) and unit prices (${expenseData.unitPrice}) are reasonable for the item (${expenseData.itemName}).
        - Check if the vendor (${expenseData.vendor}) seems legitimate.
        - If unit prices are below market averages, mark it as budget-friendly and non-fraudulent.
        - Consider if quantities match the department (${expenseData.department}) size and purpose (${expenseData.purpose}).
        - Look for unusual patterns in purchases.

        Provide a detailed analysis with specific reasons for your decision.

        Expense Details:
        ${JSON.stringify(expenseData, null, 2)}`;
        break;

      case 'accommodation':
        prompt = `Analyze this accommodation expense for potential fraud. Use the following criteria:
        
        - Verify if the accommodation location (${expenseData.location}) makes sense given the travel route and business purpose.
        - Check if the check-in and check-out dates (${expenseData.checkIn} to ${expenseData.checkOut}) are reasonable and match the purpose of the stay.
        - Evaluate the accommodation type (${expenseData.accommodationType}) and determine if it fits the business nature of the trip.
        - Assess the total cost (${expenseData.totalAmount}) and check if it aligns with typical pricing for similar accommodations in that area.
        - Consider the hotel name (${expenseData.hotelName}) and verify if it’s a legitimate establishment.
        - Ensure the number of guests (${expenseData.numberOfGuests}) matches the expected occupancy for business stays.
        
        Provide a detailed analysis with specific reasons for your decision.`;
        break;

      case 'training':
        prompt = `Analyze this training expense for potential fraud. Use the following criteria:
        
        - Verify if the course name (${expenseData.courseName}) aligns with the business or professional development purpose.
        - Check if the provider (${expenseData.provider}) is a legitimate and recognized training provider.
        - Assess the total amount (${expenseData.totalAmount}) and compare it to industry standards for similar courses.
        - Consider the duration of the training (${expenseData.startDate} to ${expenseData.endDate}) and determine if it's a reasonable timeframe.
        - Evaluate the purpose (${expenseData.purpose}) of the training and ensure it aligns with the business's needs.

        Provide a detailed analysis with specific reasons for your decision.`;
        break;

      default:
        throw new Error(`Unsupported expense type: ${expenseData.type}`);
    }

    // Call OpenAI API with the generated prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI expense auditor with expertise in fraud detection. Analyze expenses thoroughly and provide clear, specific explanations for your decisions. Be particularly attentive to travel routes, dates, amounts, and business justification. Remember that expenses below typical costs should be marked as budget-friendly and approved."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the response to determine if it's fraudulent or not
    const isBudgetFriendly =
      content.toLowerCase().includes('budget-friendly') ||
      content.toLowerCase().includes('below average') ||
      content.toLowerCase().includes('under typical');

    return {
      isFraudulent:
        !isBudgetFriendly &&
        (content.toLowerCase().includes('fraud') ||
          content.toLowerCase().includes('suspicious')),
      explanation: content,
    };
  } catch (error) {
    console.error('Error analyzing expense:', error);
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your configuration in .env file');
    }
    throw new Error('Failed to analyze expense. Please try again.');
  }
}
module.exports = { analyzeExpense };