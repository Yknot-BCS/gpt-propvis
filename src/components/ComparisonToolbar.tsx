'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ArrowLeftRight } from 'lucide-react';
import type { Property } from '../lib/mockData';

interface ComparisonToolbarProps {
  selectedProperties: Property[];
  onCompare: () => void;
  onClear: () => void;
  onRemove: (propertyId: string) => void;
}

export function ComparisonToolbar({
  selectedProperties,
  onCompare,
  onClear,
  onRemove
}: ComparisonToolbarProps) {
  if (selectedProperties.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-background border rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4 max-w-4xl"
      >
        {/* Selected Properties */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Selected:</span>
          <div className="flex gap-2 max-w-md overflow-x-auto">
            {selectedProperties.map((property) => (
              <Badge
                key={property.id}
                variant="secondary"
                className="gap-2 pr-1 whitespace-nowrap"
              >
                {property.name}
                <button
                  onClick={() => onRemove(property.id)}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-l pl-4">
          <Button
            variant="default"
            size="sm"
            onClick={onCompare}
            disabled={selectedProperties.length < 2}
            className="gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Compare {selectedProperties.length} Properties
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
          >
            Clear
          </Button>
        </div>

        {/* Hint */}
        {selectedProperties.length === 1 && (
          <div className="text-xs text-muted-foreground border-l pl-4">
            Select at least 2 properties to compare
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
