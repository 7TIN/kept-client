import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import api from "@/lib/api";

// ---- ✅ Zod Schema ----
const experienceFormSchema = z.object({
  title: z.string().min(1),
  position: z.string().min(1),
  experienceType: z.enum(["TECHNICAL", "HR", "MR"]),
  interviewDate: z.date(),
  summary: z.string().min(1),
  questions: z
    .array(
      z.object({
        questionText: z.string().min(1, "Question is required"),
        questionType: z.enum(["TECHNICAL", "HR", "MR"]),
      })
    )
    .min(1, "At least one question is required"),
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export function ShareExperienceDialog() {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: "",
      position: "",
      experienceType: "TECHNICAL",
      interviewDate: new Date(),
      summary: "",
      questions: [{ questionText: "", questionType: "TECHNICAL" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(values: ExperienceFormValues) {
  const payload = {
    ...values,
    companyId: 7, // or get from state/props
    interviewDate: values.interviewDate.toISOString().split("T")[0], // "yyyy-MM-dd"
    questions: values.questions.map((q) => ({
      question: q.questionText,
      type: q.questionType,
      section: q.questionType, // same as type if you don’t split it
    })),
  };

  try {
    await api.post("/experiences", payload);
    // ✅ success toast / close dialog etc.
  } catch (err) {
    console.error("Failed to submit experience", err);
    // ❌ show error toast
  }
}


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Experience</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[90vw] p-6 sm:p-8">
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar space-y-6">
          <DialogHeader>
            <DialogTitle>Share Your Interview Experience</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- Title --- */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. My Amazon SDE-1 Interview"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- Position --- */}
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. SDE-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- Experience Type --- */}
              <FormField
                control={form.control}
                name="experienceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TECHNICAL">Technical</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="MR">MR</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- Interview Date --- */}
              <FormField
                control={form.control}
                name="interviewDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Interview Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background text-foreground">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={2010}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- Summary --- */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short summary of your experience..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* --- Questions Section --- */}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Questions</h3>

                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-3">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_160px_32px] items-center gap-2"
                    >
                      {/* Question Text */}
                      <FormField
                        control={form.control}
                        name={`questions.${index}.questionText`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="sr-only">Question</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. What is OOP?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Question Type */}
                      <FormField
                        control={form.control}
                        name={`questions.${index}.questionType`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="sr-only">Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="TECHNICAL">
                                    Technical
                                  </SelectItem>
                                  <SelectItem value="HR">HR</SelectItem>
                                  <SelectItem value="MR">MR</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Delete Icon Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="p-0 hover:text-destructive"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({ questionText: "", questionType: "TECHNICAL" })
                  }
                >
                  + Add Question
                </Button>
              </div>
              {/* --- Submit Button --- */}
              <Button type="submit">Submit Experience</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
