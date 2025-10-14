import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { 
  Sparkles, 
  ArrowUp, 
  Minimize2, 
  MapPin, 
  Building2, 
  TrendingUp,
  Database,
  FileText,
  Users,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Property } from '../lib/mockData';
import { motion, AnimatePresence } from 'framer-motion';

type UserRole = 'executive' | 'asset-manager' | 'employee' | 'finance';
type ViewType = 'dashboard' | 'map' | 'financial' | 'properties';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  actions?: Array<{
    label: string;
    type: 'view-property' | 'show-map' | 'view-financials';
    data?: any;
  }>;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole: UserRole;
  currentView: ViewType;
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
  onViewChange?: (view: ViewType) => void;
  onMinimize: () => void;
}

export function ChatDialog({
  open,
  onOpenChange,
  userRole,
  currentView,
  selectedProperty,
  onPropertySelect,
  onViewChange,
  onMinimize
}: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your Growthpoint AI assistant. I can help you find information across your entire portfolio, answer questions about properties, financials, and more. What would you like to know?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getRoleAccessDescription = (role: UserRole) => {
    switch (role) {
      case 'executive': return 'Full portfolio access';
      case 'asset-manager': return 'Portfolio & property data';
      case 'finance': return 'Financial data access';
      case 'employee': return 'Limited access';
    }
  };

  const getQuickPrompts = () => {
    const basePrompts = {
      dashboard: [
        'What is our current portfolio occupancy rate?',
        'Show me properties with lease expiries in the next 6 months',
        'What are the top 5 performing properties by NOI?',
      ],
      map: [
        'Show all properties in Gauteng region',
        'Which areas have the highest concentration of our assets?',
        'Find properties near Sandton City',
      ],
      financial: [
        'What is our total debt-to-equity ratio?',
        'Compare budget vs actuals for Q4',
        'Show me properties with negative cash flow',
      ],
      properties: [
        'List all retail properties over 10,000 sqm',
        'Which properties are vacant or partially vacant?',
        'Show properties with rentals below market rate',
      ],
    };

    return basePrompts[currentView] || basePrompts.dashboard;
  };

  const simulateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Property-specific query
    if (lowerMessage.includes('sandton') || lowerMessage.includes('office park')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I found 3 properties in Sandton:\n\n**Sandton Office Park** - 15,420 sqm, 92% occupied, Grade A\n**Sandton City Tower** - 12,800 sqm, 88% occupied, Grade A\n**Sandton Corner** - 8,500 sqm, 95% occupied, Grade B\n\nWould you like detailed information on any of these properties?',
        timestamp: new Date(),
        sources: ['Properties Database', 'Location Index'],
        actions: [
          { label: 'View Sandton Office Park', type: 'view-property', data: 'sandton-office-park' },
          { label: 'Show on Map', type: 'show-map' }
        ]
      };
    }

    // Occupancy query
    if (lowerMessage.includes('occupancy')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Based on your ${getRoleAccessDescription(userRole)}:\n\n**Current Portfolio Occupancy: 87.3%**\n\n• Office: 89.2%\n• Retail: 91.5%\n• Industrial: 82.1%\n• Mixed-use: 85.7%\n\nThis is up 2.1% from last quarter. The industrial sector shows the most improvement with a 3.4% increase.`,
        timestamp: new Date(),
        sources: ['Occupancy Database', 'Quarterly Reports'],
      };
    }

    // Financial query
    if (lowerMessage.includes('financial') || lowerMessage.includes('revenue') || lowerMessage.includes('noi')) {
      if (userRole === 'employee') {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'I apologize, but financial data access is restricted to Executive and Finance team members. You can view property information, locations, and occupancy data instead.',
          timestamp: new Date(),
        };
      }

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Portfolio Financial Overview:**\n\nTotal NOI: R 2.4B (+5.2% YoY)\nGross Revenue: R 3.8B\nOperating Expenses: R 1.4B\nOccupancy-adjusted NOI: R 2.3B\n\nTop performers:\n1. Sandton Office Park - R 45M NOI\n2. Waterfall Mall - R 38M NOI\n3. Century City - R 32M NOI`,
        timestamp: new Date(),
        sources: ['Financial Database', 'P&L Reports'],
        actions: [
          { label: 'View Full Financial Report', type: 'view-financials' }
        ]
      };
    }

    // Lease expiry query
    if (lowerMessage.includes('lease') || lowerMessage.includes('expir')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Upcoming Lease Expiries (Next 6 months):**\n\n7 leases expiring, representing R 125M in annual revenue:\n\n• Sandton Office Park - 2,400 sqm (Feb 2026)\n• Hyde Park Corner - 1,800 sqm (Mar 2026)\n• Rosebank Link - 3,200 sqm (Apr 2026)\n\nRenewal negotiations are underway for 5 of these leases.`,
        timestamp: new Date(),
        sources: ['Lease Management System', 'Tenancy Database'],
        actions: [
          { label: 'View All Expiries', type: 'view-property' }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I can help you with:\n\n• Property information and search\n• Portfolio performance metrics\n• Occupancy and tenancy data\n${userRole === 'executive' || userRole === 'finance' ? '• Financial analysis and reports\n' : ''}• Location-based queries\n• Market comparisons\n\nWhat specific information are you looking for?`,
      timestamp: new Date(),
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = simulateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 w-[440px] h-[680px] bg-background border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base">AI Portfolio Assistant</h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="gap-1">
                    <Users className="w-3 h-3" />
                    {userRole === 'executive' && 'Executive'}
                    {userRole === 'asset-manager' && 'Asset Manager'}
                    {userRole === 'finance' && 'Finance Team'}
                    {userRole === 'employee' && 'Employee'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{getRoleAccessDescription(userRole)}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMinimize}
                className="h-8 w-8"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Context Chips */}
            {(selectedProperty || currentView) && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-muted-foreground">Context:</span>
                {currentView && (
                  <Badge variant="secondary" className="gap-1">
                    {currentView === 'dashboard' && <TrendingUp className="w-3 h-3" />}
                    {currentView === 'map' && <MapPin className="w-3 h-3" />}
                    {currentView === 'financial' && <Database className="w-3 h-3" />}
                    {currentView === 'properties' && <Building2 className="w-3 h-3" />}
                    {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
                  </Badge>
                )}
                {selectedProperty && (
                  <Badge variant="secondary" className="gap-1">
                    <Building2 className="w-3 h-3" />
                    {selectedProperty.name}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4" ref={scrollRef}>
            <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  
                  {/* Data Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                      <Database className="w-3 h-3 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {message.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => {
                            if (action.type === 'view-financials' && onViewChange) {
                              onViewChange('financial');
                              onOpenChange(false);
                            }
                            if (action.type === 'show-map' && onViewChange) {
                              onViewChange('map');
                              onOpenChange(false);
                            }
                          }}
                        >
                          {action.label}
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-6 py-3 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-col gap-2">
                {getQuickPrompts().slice(0, 3).map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 px-3 text-xs text-left justify-start w-full"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <FileText className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="line-clamp-1">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your portfolio..."
                className="min-h-[50px] max-h-[100px] resize-none text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="h-[50px] w-[50px] flex-shrink-0 bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
