import { useState } from "react";
import { Zap, X, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStations } from "@/context/StationContext";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi! I'm your EV Assistant ⚡ Ask me about charging stations in Coimbatore!", sender: "bot" },
  ]);
  const { stations } = useStations();

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u${Date.now()}`, text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const query = input.toLowerCase();
    let reply = "I can help you find EV stations, check availability, and recommend the best station. Try asking about a specific location!";

    const matchedStation = stations.find(
      (s) => query.includes(s.name.toLowerCase().split(" ")[0].toLowerCase()) || query.includes(s.address.toLowerCase().split(",")[0].toLowerCase())
    );

    if (matchedStation) {
      reply = `📍 ${matchedStation.name}\n\n🔌 Available Ports: ${matchedStation.availablePorts}/${matchedStation.totalPorts}\n⚡ Speed: ${matchedStation.chargingSpeed}\n🔋 Types: ${matchedStation.chargingTypes.join(", ")}\n⭐ Rating: ${matchedStation.rating}\n⏱ Wait: ${matchedStation.estimatedWaitTime}`;
    } else if (query.includes("best") || query.includes("recommend")) {
      const best = [...stations].sort((a, b) => b.rating - a.rating)[0];
      reply = `🏆 Recommended: ${best.name}\n\n⭐ Rating: ${best.rating}\n🔌 ${best.availablePorts} ports available\n⚡ Speed: ${best.chargingSpeed}\n💰 ₹${best.pricePerKwh}/kWh`;
    } else if (query.includes("available") || query.includes("free")) {
      const available = stations.filter((s) => s.availablePorts > 3).slice(0, 3);
      reply = `Stations with good availability:\n\n${available.map((s) => `• ${s.name}: ${s.availablePorts} ports free`).join("\n")}`;
    } else if (query.includes("fast")) {
      const fast = stations.filter((s) => s.chargingTypes.includes("Fast")).slice(0, 3);
      reply = `⚡ Fast charging stations:\n\n${fast.map((s) => `• ${s.name} (${s.chargingSpeed})`).join("\n")}`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `b${Date.now()}`, text: reply, sender: "bot" }]);
    }, 500);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 z-50 flex h-[28rem] w-80 flex-col rounded-2xl border border-border bg-card shadow-2xl md:bottom-6 md:right-6"
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-primary p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground">EV Assistant</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-primary-foreground hover:bg-primary/80">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stations..."
                  className="flex-1"
                />
                <Button size="icon" type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg md:bottom-6 md:right-6"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </motion.button>
      )}
    </>
  );
};

export default Chatbot;
