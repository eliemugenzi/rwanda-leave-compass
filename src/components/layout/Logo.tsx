
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Clock className="h-6 w-6 text-primary" strokeWidth={2.5} />
      <span className="font-bold text-lg text-foreground">Time Away</span>
    </div>
  );
}
