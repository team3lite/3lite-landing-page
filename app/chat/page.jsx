import SendSui from "@/components/SendSui";
import ChatList from "@/components/ChatList";
import ChatNavs from "@/components/ChatNavs";

export default function page() {
  return (
    <div className="  flex    overflow-hidden w-full">
      <ChatNavs>
        <ChatList />
      </ChatNavs>
    </div>
  );
}
