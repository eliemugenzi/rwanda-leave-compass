
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { mockLeaveBalances } from "@/data/mockData";

const formSchema = z.object({
  leaveType: z.string({
    required_error: "Please select a leave type",
  }),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
  endDate: z.date({
    required_error: "Please select an end date",
  }),
  reason: z.string().min(5, {
    message: "Reason must be at least 5 characters",
  }),
});

const LeaveRequest = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Request Leave</h1>
        <p className="text-muted-foreground">
          Submit a new leave request for approval
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="leaveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a leave type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Leave Types</SelectLabel>
                            {mockLeaveBalances.map((balance) => (
                              <SelectItem key={balance.type} value={balance.type}>
                                {balance.type} ({balance.available} days available)
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setStartDate(date);
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              startDate && date < startDate
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide a reason for your leave request"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please be specific about the reason for your leave.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit">Submit Leave Request</Button>
              </form>
            </Form>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Leave Policy Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">Personal Time Off (PTO)</h4>
                <p className="text-muted-foreground">
                  Employees are entitled to 20 days of personal time off per year.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Sick Leave</h4>
                <p className="text-muted-foreground">
                  Up to 12 days of paid sick leave per year with medical certificate required for leaves exceeding 3 consecutive days.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Compassionate Leave</h4>
                <p className="text-muted-foreground">
                  Up to 7 days in case of death of a spouse, child, parent or sibling.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Maternity Leave</h4>
                <p className="text-muted-foreground">
                  Female employees are entitled to 12 weeks (84 days) of paid maternity leave per Rwandan labor law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LeaveRequest;
