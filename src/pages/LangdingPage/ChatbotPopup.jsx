import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const GRADIENTS = {
  primary: "linear-gradient(135deg, #3B82F6, #06B6D4)",
  secondary: "linear-gradient(135deg, #22D3EE, #3B82F6)",
};

function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý AI của XinKEdu. Tôi có thể giúp gì cho bạn?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    "Tôi muốn tìm hiểu về các khóa học",
    "Giá cả như thế nào?",
    "Làm sao để đăng ký?",
    "Tôi cần hỗ trợ kỹ thuật",
  ];

  const handleSendMessage = (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes("khóa học") || msg.includes("course")) {
      return "Chúng tôi có nhiều khóa học PTE, IELTS với công nghệ AI hỗ trợ. Bạn có thể xem chi tiết tại mục Features hoặc liên hệ 0862706996 để được tư vấn.";
    } else if (msg.includes("giá") || msg.includes("price")) {
      return "Chúng tôi có nhiều gói dịch vụ từ miễn phí đến chuyên nghiệp. Vui lòng xem mục Pricing để biết chi tiết hoặc liên hệ để được báo giá cụ thể.";
    } else if (msg.includes("đăng ký") || msg.includes("register")) {
      return "Bạn có thể đăng ký bằng cách nhấn nút 'Dùng thử miễn phí' hoặc liên hệ hotline 0862706996. Chúng tôi sẽ hỗ trợ bạn ngay!";
    } else if (msg.includes("hỗ trợ") || msg.includes("support")) {
      return "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7. Bạn có thể liên hệ qua email hi@ixink.com hoặc hotline 0862706996.";
    } else {
      return "Cảm ơn bạn đã liên hệ! Để được hỗ trợ tốt nhất, vui lòng liên hệ hotline 0862706996 hoặc email hi@ixink.com. Chúng tôi sẽ phản hồi trong vòng 24h.";
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          style={{ background: GRADIENTS.secondary }}
        >
          <MessageCircle size={24} className="animate-bounce" />
          
          {/* Pulse effect */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: GRADIENTS.secondary }}
          />
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Cần hỗ trợ?
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="p-4 text-white flex items-center justify-between"
            style={{ background: GRADIENTS.primary }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Trợ lý AI</h4>
                <p className="text-xs opacity-90">Đang hoạt động</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                {message.isBot && (
                  <div className="p-1.5 bg-blue-100 rounded-full flex-shrink-0">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                    message.isBot
                      ? "bg-slate-100 text-slate-800"
                      : "text-white"
                  }`}
                  style={!message.isBot ? { background: GRADIENTS.secondary } : {}}
                >
                  {message.text}
                </div>

                {!message.isBot && (
                  <div className="p-1.5 bg-slate-100 rounded-full flex-shrink-0">
                    <User size={16} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ background: GRADIENTS.secondary }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotPopup;