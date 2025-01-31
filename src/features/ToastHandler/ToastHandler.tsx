'use client';

import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface ToastHandlerProps {
  error?: string;
}

export function ToastHandler({ error }: ToastHandlerProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  return null;
}
