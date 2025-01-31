'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ComboboxType {
  data: { label: string; value: string }[];
  fieldLabel: string;
  setValue: (value: string) => void;
}

export function ComboboxDemo({ fieldLabel, data, setValue }: ComboboxType) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <text className="text-balance text-muted-foreground text-sm">
        {fieldLabel}
      </text>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? data.find((dataItem) => dataItem.value === selectedValue)?.label
            : 'Select framework...'}
          <ChevronsUpDown className="opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {data.map((dataItem) => (
                <CommandItem
                  key={dataItem.value}
                  value={dataItem.value}
                  onSelect={(currentValue) => {
                    setSelectedValue(
                      currentValue === selectedValue ? '' : currentValue
                    );
                    setValue(
                      currentValue === selectedValue ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {dataItem.label}
                  {selectedValue === dataItem.value && (
                    <Check className={cn('ml-auto')} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
