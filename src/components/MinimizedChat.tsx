import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';

interface MinimizedChatProps {
  onMaximize: () => void;
  hasUnread?: boolean;
}

export function MinimizedChat({ onMaximize, hasUnread }: MinimizedChatProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onMaximize}
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg relative bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
      >
        <Sparkles className="w-6 h-6" />
        {hasUnread && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive"
          >
            <span className="sr-only">New message</span>
          </Badge>
        )}
      </Button>
    </motion.div>
  );
}
