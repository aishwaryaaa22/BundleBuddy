const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getOptimizedPrice = async (basePrice, currentMembers, demandFactor) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As a pricing expert, suggest a discounted price for a product with a base price of ₹${basePrice}. 
    Currently, ${currentMembers} people have joined a group buy. 
    The demand factor is ${demandFactor} (1-10 scale).
    Return only the number representing the optimized price, no text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return Number(response.text());
};

module.exports = { getOptimizedPrice };