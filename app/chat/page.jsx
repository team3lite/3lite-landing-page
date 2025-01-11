import ChatList from "@/components/ChatList";
import ChatNavs from "@/components/ChatNavs";
import { ChatProvider } from "@/providers/ChatContext";
export default function page() {
  return (
    <div className="  flex  overflow-hidden w-full">
      <ChatProvider>
        <ChatNavs>
          <ChatList />
        </ChatNavs>
      </ChatProvider>
    </div>
  );
}
