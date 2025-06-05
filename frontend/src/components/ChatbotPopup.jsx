import { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChatbotPopup() {
  const {
    messages,
    addMessages,
    getMessages,
    clearMessages,
    token,
  } = useContext(AppContext);

  const [chatbotNumber, setChatbotNumber] = useState(2);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const handlelogintochat = () => {
    toast.warn('Log in or sign up to chat with our AI assistant!');
    navigate('/login');
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    await addMessages(input.trim(), chatbotNumber);
    setInput('');
    setLoading(false);
  };

  const handleClear = () => {
     clearMessages(chatbotNumber);
    setShowConfirm(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      await getMessages(chatbotNumber);
      setLoading(false);
    };
    fetchMessages();
  }, [chatbotNumber]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const chatbotOptions = [
    { label: 'Query', value: 1 },
    { label: 'Thinking', value: 2 },
  ];

  return token ? (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 h-[500px] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden border border-gray-300 relative"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
              <h2 className="font-semibold text-sm">MinhGadget Chatbot</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-xs hover:underline hover:text-red-200"
                  title="Clear chat"
                >
                  🗑 Clear
                </button>
                <button onClick={() => setOpen(false)} className="hover:text-red-200">
                  ✖
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-3 bg-gray-50"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #edf2f7',
              }}
            >
              <div className="flex flex-col space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg max-w-[90%] text-sm whitespace-pre-line break-words ${
                      msg.role === 'user'
                        ? 'bg-blue-100 self-end ml-auto'
                        : 'bg-gray-200 self-start'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="bg-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm self-start animate-pulse max-w-[90%]">
                    Đang trả lời...
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2 items-center">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập tin nhắn..."
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Gửi
              </button>
            </div>

            {/* Bot Selector (under input) */}
            <div className="border-t px-3 py-2 flex justify-center gap-2 bg-gray-50">
              {chatbotOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setChatbotNumber(opt.value)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    chatbotNumber === opt.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Confirm Modal */}
            {showConfirm && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-5 rounded-lg shadow-xl w-72 max-h-[80%] overflow-y-auto space-y-4 text-center">
                  <p className="font-medium">Xoá toàn bộ tin nhắn?</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleClear}
                      className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                    >
                      Có
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="bg-gray-300 px-4 py-1 rounded-lg hover:bg-gray-400"
                    >
                      Không
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          Chat with bot 🤖
        </button>
      )}
    </div>
  ) : (
    <div
      className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 cursor-pointer"
      onClick={() => {
        handlelogintochat();
        scrollTo(0, 0);
      }}
    >
      Chat with bot 🤖
    </div>
  );
}
