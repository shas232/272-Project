import OpenAI from 'openai';

const openai = new OpenAI({
//   apiKey: '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', // Update with your actual API key
  dangerouslyAllowBrowser: true
});

export async function analyzeExpense(expenseData) {
  try {
    let prompt;

    // Determine the type of expense and build the appropriate prompt
    switch (expenseData.type) {
      case 'travel':
        prompt = `Analyze this travel expense for potential fraud. Use the following criteria:

        - Verify if the locations (${expenseData.departureLocation} to ${expenseData.destination}) exist and make sense geographically.
        - Check if travel dates (${expenseData.departureDate} to ${expenseData.returnDate}) are logical and within reasonable timeframes.
        - If the total amount (${expenseData.totalAmount}) is significantly less than typical ranges for the route and duration, mark it as budget-friendly and non-fraudulent.
        - Consider the business purpose (${expenseData.purpose}) and determine if it justifies the expense.
        - Look for unusual patterns or discrepancies in the expense details.

        Provide a detailed analysis with specific reasons for your decision.`;
        break;

      case 'officeSupplies':
        prompt = `Analyze this office supplies expense for potential fraud. Use the following criteria:

        - Verify if the quantities and prices are reasonable for the items.
        - Check if the vendor seems legitimate.
        - If unit prices are below market averages, mark it as budget-friendly and non-fraudulent.
        - Consider if quantities match the department size.
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

      default:
        throw new Error(`Unsupported expense type: ${expenseData.type}`);
    }

    // Call OpenAI API with the generated prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI expense auditor with expertise in fraud detection. Analyze expenses thoroughly and provide clear, specific explanations for your decisions. Be particularly attentive to travel routes, dates, amounts, and business justification. Remember that expenses below typical costs should be marked as budget-friendly and approved."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the response
    const isBudgetFriendly =
      content.toLowerCase().includes('budget-friendly') ||
      content.toLowerCase().includes('below average') ||
      content.toLowerCase().includes('under typical');

    return {
      isFraudulent:
        !isBudgetFriendly &&
        (content.toLowerCase().includes('fraud') ||
          content.toLowerCase().includes('suspicious')),
      explanation: content
    };
  } catch (error) {
    console.error('Error analyzing expense:', error);
    if (error.status === 401) {
      throw new Error('Invalid OpenAI API key. Please check your configuration in .env file');
    }
    throw new Error('Failed to analyze expense. Please try again.');
  }
}
