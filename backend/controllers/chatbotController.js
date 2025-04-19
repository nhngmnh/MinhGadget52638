import Groq from 'groq-sdk'
import { groq } from '../config/groq.js'


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
    const { userId, userMessage } = req.body;

    if (!userId || !userMessage) {
      return res.status(400).json({ error: 'Missing userId or userMessage' });
    }

    // Tìm lịch sử hoặc tạo mới
    let history = await conversationModel.findOne({ userId });

    if (!history) {
      history = new conversationModel({
        userId,
        conversation: []
      });
    }
    const groq1 = new Groq({ apiKey: groq.apiKey });
    // Thêm message người dùng
    history.conversation.push({ role: 'user', text: userMessage });

    // Gọi tới Groq
    const completion = await groq1.chat.completions.create({
      model:groq.model,
      messages: history.conversation.map(({ role, text }) => ({ role, content: text }))
    });

    const assistantReply = completion.choices[0].message.content;

    // Thêm phản hồi assistant
    history.conversation.push({ role: 'assistant', text: assistantReply });
    history.updatedAt = new Date();
    await history.save();

    // Trả kết quả về client
    return res.status(200).json({ reply: assistantReply });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
export {
    askGroq,handleChat
}