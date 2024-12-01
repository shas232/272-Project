import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true
});

export async function analyzeExpense(expenseData: any): Promise<{ isFraudulent: boolean; explanation: string }> {
    try {
        console.log('in try');
      let prompt: string;
  
      // Determine the type of expense and build the appropriate prompt
      switch (expenseData.type) {
        case 'travel':
            console.log('in travel');
          prompt = `Analyze this travel expense for potential fraud. Use the following criteria:
          
          - Verify if the locations (${expenseData.departureLocation} to ${expenseData.destination}) exist and make sense geographically.
          - Check if travel dates (${expenseData.departureDate} to ${expenseData.returnDate}) are logical and within reasonable timeframes.
          - If the total amount (${expenseData.totalAmount}) is significantly less than typical ranges for the route and duration, mark it as budget-friendly and non-fraudulent.
          - Consider the business purpose (${expenseData.purpose}) and determine if it justifies the expense.
          - Look for unusual patterns or discrepancies in the expense details.
  
          Provide a detailed analysis with specific reasons for your decision.`;
          break;
  
        // Add other cases for different expense types here
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
        console.log('no content');
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
    } catch (error: any) {
      console.error('Error analyzing expense:', error);
  
      if (error.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your configuration in .env file');
      }
  
      throw new Error('Failed to analyze expense. Please try again.');
    }
  }
  
