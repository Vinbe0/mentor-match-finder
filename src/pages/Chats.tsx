import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Send, ArrowLeft, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Chats = () => {
  const { chatId } = useParams();
  const { user, chats, sendMessage } = useAuth();
  const [msgText, setMsgText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatId ? chats.find((c) => c.id === chatId) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages.length]);

  if (!user) {
    return (
      <div className="container py-16 text-center">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium mb-4">Please log in to view your chats</p>
        <Button variant="hero" asChild>
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  const userChats = chats.filter((c) => c.participantIds.includes(user.id));

  const getOtherParticipant = (chat: typeof chats[0]) => {
    const otherId = chat.participantIds.find((id) => id !== user.id) || "";
    return {
      name: chat.participantNames[otherId] || "Unknown",
      avatar: chat.participantAvatars[otherId] || "",
    };
  };

  const handleSend = async () => {
    if (!msgText.trim() || !activeChat) return;
    const text = msgText.trim();
    setMsgText("");
    await sendMessage(activeChat.id, text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container py-6 relative">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Conversations</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
        </div>
      </div>

      <div className="container flex-1 py-6">
        <div className="flex gap-6 h-[calc(100vh-280px)] min-h-[400px]">
          {/* Chat list sidebar */}
          <div className="w-72 shrink-0 rounded-2xl border bg-card card-shadow overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <p className="text-sm font-semibold text-foreground">{userChats.length} conversation{userChats.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {userChats.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <p>No conversations yet.</p>
                  <p className="mt-1">Message a mentor to start chatting!</p>
                </div>
              ) : (
                userChats.map((chat) => {
                  const other = getOtherParticipant(chat);
                  const lastMsg = chat.messages[chat.messages.length - 1];
                  const isActive = activeChat?.id === chat.id;
                  return (
                    <Link
                      key={chat.id}
                      to={`/chats/${chat.id}`}
                      className={`flex items-center gap-3 p-4 border-b transition-colors hover:bg-muted/50 ${
                        isActive ? "bg-primary/5 border-l-2 border-l-primary" : ""
                      }`}
                    >
                      <img src={other.avatar} alt={other.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-border" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{other.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {lastMsg ? lastMsg.text : "No messages yet"}
                        </p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 rounded-2xl border bg-card card-shadow overflow-hidden flex flex-col">
            {activeChat ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <img
                    src={getOtherParticipant(activeChat).avatar}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{getOtherParticipant(activeChat).name}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeChat.messages.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-12">
                      <p>No messages yet. Say hello! 👋</p>
                    </div>
                  )}
                  {activeChat.messages.map((msg) => {
                    const isMine = msg.senderId === user.id;
                    return (
                      <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                            isMine
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted text-foreground rounded-bl-md"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-[10px] mt-1 ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" variant="hero" size="icon" disabled={!msgText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-1">Select a conversation</p>
                  <p className="text-sm text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
