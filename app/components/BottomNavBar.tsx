import { Flame, Lightbulb, Heart, MessageCircle, User } from "lucide-react";

export default function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-container border-t border-purple flex justify-around items-center h-16 z-50 max-w-[430px] mx-auto">
      <a href="/" className="flex flex-col items-center text-cta" title="Match">
        <Flame size={26} />
      </a>
      <a href="/advice" className="flex flex-col items-center text-purple" title="Advice">
        <Lightbulb size={26} />
      </a>
      <a href="/like" className="flex flex-col items-center text-danger" title="Like">
        <Heart size={26} />
      </a>
      <a href="/chat" className="flex flex-col items-center text-green" title="Chat">
        <MessageCircle size={26} />
      </a>
      <a href="/account" className="flex flex-col items-center text-main" title="Account">
        <User size={26} />
      </a>
    </nav>
  );
} 