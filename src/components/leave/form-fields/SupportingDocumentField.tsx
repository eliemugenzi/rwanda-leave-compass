
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LeaveRequestFormValues } from "@/validation/leave-request.schema";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface SupportingDocumentFieldProps {
  form: UseFormReturn<LeaveRequestFormValues>;
}

export function SupportingDocumentField({ form }: SupportingDocumentFieldProps) {
  const [fileName, setFileName] = useState<string>("");

  return (
    <FormField
      control={form.control}
      name="supportingDocument"
      render={({ field: { onChange, onBlur, value, ...field } }) => (
        <FormItem>
          <FormLabel>Supporting Document (optional)</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                id="supportingDocument"
                onBlur={onBlur}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    if (file.size > MAX_FILE_SIZE) {
                      form.setError("supportingDocument", {
                        message: "File size must not exceed 5MB"
                      });
                      setFileName("");
                    } else {
                      onChange(file);
                      setFileName(file.name);
                      form.clearErrors("supportingDocument");
                    }
                  }
                }}
                className="cursor-pointer"
                {...field}
              />
              {fileName && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {fileName}
                </p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
