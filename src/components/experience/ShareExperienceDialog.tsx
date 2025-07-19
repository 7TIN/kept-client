import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
const schema = z.object({
  companyName: z.string().min(1, "Company is required"),
  title: z.string().min(1),
  position: z.string().min(1),
  experienceType: z.enum(["TECHNICAL", "HR", "MR"]),
  interviewDate: z.date(),
  summary: z.string().min(1),
  questions: z
    .array(
      z.object({
        questionText: z.string().min(1),
        questionType: z.enum(["TECHNICAL", "HR", "MR"]),
      })
    )
    .min(1),
});
type FormValues = z.infer<typeof schema>;

type Company = { id: number; name: string };

function CompanyCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    api
      .get<Company[]>("/companies", { params: { q: query } })
      .then((res) => setOptions(res.data))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value || "Select or create company"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-1 space-y-1 bg-background">
        <Input
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2"
        />

        {loading && <p className="px-2 text-sm">Loading…</p>}

        {options.map((c) => (
          <Button
            key={c.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              onChange(c.name);
            }}
          >
            {c.name}
          </Button>
        ))}

        {/* If no match, show create option */}
        {query &&
          !options.some(
            (c) => c.name.toLowerCase() === query.trim().toLowerCase()
          ) && (
            <Button
              variant="ghost"
              className="w-full justify-start text-primary"
              onClick={() => onChange(query)}
            >
              +Create “{query}”
            </Button>
          )}
      </PopoverContent>
    </Popover>
  );
}

interface ShareExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FORM_STATE_KEY = 'shareExperienceForm';

export function ShareExperienceDialog({ open, onOpenChange }: ShareExperienceDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
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

  useEffect(() => {
    if (open) {
      const savedStateJSON = sessionStorage.getItem(FORM_STATE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState.interviewDate) {
          savedState.interviewDate = new Date(savedState.interviewDate);
        }
        form.reset(savedState);
      }
    }
  }, [open, form]);

  async function onSubmit(values: FormValues) {
    sessionStorage.setItem(FORM_STATE_KEY, JSON.stringify(values));
    try {
      const searchRes = await api.get<Company[]>("/companies", {
        params: { q: values.companyName.trim() },
      });

      const normalized = values.companyName.trim().toLowerCase();
      let company =
        searchRes.data.find((c) => c.name.toLowerCase() === normalized) ?? null;

      if (!company) {
        const createRes = await api.post<Company>("/companies", {
          name: values.companyName,
        });
        company = createRes.data;
      }

      const payload = {
        ...values,
        companyId: company!.id,
        interviewDate: values.interviewDate.toISOString().split("T")[0],
        questions: values.questions.map((q) => ({
          question: q.questionText,
          type: q.questionType,
          section: q.questionType,
        })),
      };

      await api.post("/experiences", payload);

      sessionStorage.removeItem(FORM_STATE_KEY);
      onOpenChange(false);

    } catch (err) {
      console.error("Failed to submit experience:", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button>Add Experience</Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-2xl w-[90vw] p-6 sm:p-8">
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar space-y-6">
          <DialogHeader>
            <DialogTitle>Share Your Interview Experience</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <CompanyCombobox
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ───── Row 2: Position, Type, Date ───── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <FormField
                  control={form.control}
                  name="interviewDate"
                  render={({ field }) => (
                    <FormItem>
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
              </div>

              {/* ───── Summary ───── */}
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

              {/* ───── Questions Section ───── */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                <div className="max-h-60 overflow-y-auto no-scrollbar space-y-3">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_160px_32px] items-center gap-2"
                    >
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

              <div className="flex justify-center">
                <Button type="submit" className="w-40">
                  Submit Experience
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
