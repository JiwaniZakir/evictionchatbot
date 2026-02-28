import { useState, useRef, useEffect } from "react";
import rawPrompt from "../src/prompt.txt";
import Loader from "./Loader";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const systemPromptRef = useRef(null);

  useEffect(() => {
    fetch(rawPrompt)
      .then((res) => res.text())
      .then((text) => { systemPromptRef.current = text; })
      .catch((err) => console.error("Failed to load system prompt:", err));
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.length === 0) {
      return;
    }

    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: input, sender: "user" },
      ]);

      setLoading(true);

      const userInputPrompt = input;
      await sendMessageWithHistory(userInputPrompt);

      setInput("");
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessageWithHistory = async (userInputPrompt) => {
    try {
      if (!systemPromptRef.current) {
        const response = await fetch(rawPrompt);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch file prompt.txt: ${response.statusText}`
          );
        }
        systemPromptRef.current = await response.text();
      }

      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }));

      const apiMessages = [
        { role: "system", content: systemPromptRef.current },
        ...chatHistory,
        { role: "user", content: userInputPrompt },
      ];

      const apiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json().catch(() => ({}));
        throw new Error(
          errorData.error || `API request failed: ${apiResponse.statusText}`
        );
      }

      const aiResponse = await apiResponse.json();

      aiResponse.choices.forEach((messageResponse) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: messageResponse.message.content, sender: "bot" },
        ]);
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderFormattedText = (text) => {
    return text.split("\n").map((line, index) => (
      <p key={index} className="mb-1">
        {line}
      </p>
    ));
  };

  return (
    <>
      {loading && (
        <div className="absolute bg-black bg-opacity-50 flex items-center justify-center top-0 w-screen h-screen z-10">
          <Loader />
        </div>
      )}
      <div className="bg-pink-100 max-h-screen flex flex-col w-4/5 rounded-lg my-6 relative">
        <h1 className="text-6xl text-center font-bold mb-4">Chat with EVITA</h1>
        <div className="flex-1 overflow-y-auto px-4 py-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              } `}
            >
              <div
                className={`max-w-md rounded-lg px-4 py-2 shadow-md ${
                  message.sender === "user"
                    ? "bg-purple-400 text-white self-end"
                    : "bg-white text-black self-start"
                }`}
              >
                <p className="text-xs font-bold mb-1">
                  {message.sender === "user" ? "You" : "Evita"}
                </p>
                {renderFormattedText(message.content)}
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex items-center px-4 py-2 my-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 mr-4 focus:outline-none focus:border-blue-500 shadow-md"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-purple-600 shadow-md outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chatbot;
