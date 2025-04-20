import Groq from 'groq-sdk'
import { groq } from '../config/groq.js'
import conversationModel from '../models/conversationModel.js';
import productModel from '../models/productModel.js';
const askGroq = async (req, res) => {
    try {
      const groq1 = new Groq({ apiKey: groq.apiKey });
        const { message } = req.body;
    
        if (!message) {
          return res.status(400).json({ error: 'Message is required' });
        }
    
        const response = await groq1.chat.completions.create({
          model:groq.model,
          messages: [{ role: "user", content: message }],
          temperature: 0.7,
        });
    
        return res.status(200).json({
          reply: response.choices[0]?.message?.content
        });
    
      } catch (error) {
        console.error('Groq API Error:', error);
        return res.status(500).json({ 
          error: 'AI service error',
          details: error.message 
        });
      }
}
const handleChat = async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ success: false, message: 'Missing userId or message' });
    }

    const SYSTEM_PROMPT = `You are an AI assistant for "MinhGadget" – a tech gadget e-commerce website founded by Nhữ Ngọc Minh.

Your job is to answer user questions naturally like a helpful assistant. If the question involves product data, respond in this format:

1. Start with a short friendly sentence to explain what kind of products will be returned.
2. Then, include a MongoDB query using this format only: \`\`\`javascript
productModel.find(...)
\`\`\`

Important:
- Do NOT use db. or any other functions like count(), aggregate(), or findOne().
- Always use productModel.find(...), even if the user asks for the number of products.
- The product schema has the fields: name, brand, category, price, description, specifications, createdAt, bestseller, available.
- I use VNĐ currency, so when user ask about price, please change it to VNĐ
- The category is one of: Smartphone, Smartwatch, Accessory, Laptop, PcPrinter, Other.
- Handle user typos in category and brand gracefully.
- If the question is not related to a query, answer naturally like a regular assistant.
- When they want to know the details about the product, please query and display the description and specifications fields.
If they ask about the shop or owner, tell them to check the 'contact', 'privacy', or 'about us' pages.
No need to explain how you query.
`;

    let history = await conversationModel.findOne({ userId });
    if (!history) {
      history = new conversationModel({ userId, conversation: [] });
    }

    const groq1 = new Groq({ apiKey: groq.apiKey });
    const tempMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.conversation.map(({ role, text }) => ({ role, content: text })),
      { role: 'user', content: message }
    ];

    const completion = await groq1.chat.completions.create({
      model: groq.model,
      messages: tempMessages
    });

    let assistantReply = completion.choices[0].message.content;

    // --- Tìm và chạy MongoDB query nếu có ---
    const match = assistantReply.match(/productModel\.find\(([\s\S]*?)\)/);
    let products = [];

    if (match) {
      try {
        const queryObj = eval(`(${match[1]})`);
        products = await productModel.find(queryObj).lean();
        if (products.length > 0) {
          const productList = products.map(p => `- **${p.name}** – ${p.price.toLocaleString('vi-VN')}đ`).join('\n');
          assistantReply = assistantReply.replace(/```javascript[\s\S]*?```/, productList);
        } else {
          assistantReply = assistantReply.replace(/```javascript[\s\S]*?```/, 'Hiện tại không có sản phẩm nào phù hợp.');
        }
      } catch (err) {
        console.error('Query execution error:', err);
        assistantReply += '\n\n⚠️ Đã xảy ra lỗi khi truy vấn dữ liệu.';
      }
    }

    history.conversation.push({ role: 'user', text: message });
    history.conversation.push({ role: 'assistant', text: assistantReply });
    history.updatedAt = new Date();
    await history.save();

    return res.status(200).json({ conversation: history.conversation });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const handleDeleteChatHistory = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Missing userId' });
    }

    // Tìm lịch sử chat của người dùng và xóa
    const result = await conversationModel.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json({ success: false, message: 'User chat history not found' });
    }

    // Trả về thông báo thành công
    return res.status(200).json({ success: true, message: 'Delete successfully' });

  } catch (error) {
    console.error('Error deleting chat history:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
export {
    askGroq,handleChat,handleDeleteChatHistory
}