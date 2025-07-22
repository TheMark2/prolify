import * as React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange, placeholder = "Pick a date", disabled = false, className, ...props }, ref) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
    const [currentMonth, setCurrentMonth] = React.useState<Date>(value || new Date());

    React.useEffect(() => {
      setSelectedDate(value);
      if (value) {
        setCurrentMonth(value);
      }
    }, [value]);

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      onChange?.(date);
    };

    const formatDate = (date: Date | undefined) => {
      if (!date) return placeholder;
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        if (direction === 'prev') {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    };

    const isToday = (date: Date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date) => {
      return selectedDate && date.toDateString() === selectedDate.toDateString();
    };

    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-neutral-500",
              className
            )}
            disabled={disabled}
            {...props}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(selectedDate)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-semibold">
                {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="h-8 w-8 text-center text-xs font-medium text-neutral-500 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index} className="h-8 w-8">
                  {day && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 font-normal",
                        isSelected(day) && "bg-neutral-900 text-white hover:bg-neutral-900 hover:text-white",
                        isToday(day) && !isSelected(day) && "bg-neutral-100",
                      )}
                      onClick={() => handleDateSelect(day)}
                    >
                      {day.getDate()}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
