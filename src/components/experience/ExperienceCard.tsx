import * as React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Question = {
  question: string;
  type: string;
  section: string;
};

export type Experience = {
  id: number;
  title: string;
  position: string;
  companyName: string;
  experienceType: string;
  interviewDate: string; // ISO yyyy‑MM‑dd
  summary: string;
  questions: Question[];
};

interface Props {
  experience: Experience;
}

export function ExperienceCard({ experience }: Props) {
  const dateLabel = format(new Date(experience.interviewDate), "PPP");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted/20 transition">
          {/* ---------- TOP ROW ---------- */}
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex gap-2 font-medium">
                <span>{experience.companyName}</span>
                <span>•</span>
                <span>{experience.title}</span>
              </div>
              <span className="text-xs">{dateLabel}</span>
            </div>
          </CardHeader>

          {/* ---------- MIDDLE ROW ---------- */}
          <CardContent className="p-4 pt-0 space-y-1.5">
            <p className="text-sm text-muted-foreground">
              {experience.position} • {experience.experienceType}
            </p>
            <p className="text-sm line-clamp-3">{experience.summary}</p>
          </CardContent>

          {/* ---------- FOOTER ---------- */}
          <CardFooter className="px-4 pb-4">
            <Button variant="link" className="px-0 text-sm">
              View details →
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      {/* ---------- DIALOG ---------- */}
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto scrollbar-hidden">
        <DialogHeader>
          <DialogTitle>{experience.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {experience.position} • {experience.companyName} • {dateLabel}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <p>{experience.summary}</p>

          <div className="space-y-2">
            <h4 className="font-medium">Questions</h4>
            {experience.questions.map((q, idx) => (
              <div
                key={idx}
                className="rounded-md border p-3 text-sm space-y-1 bg-muted/30"
              >
                <p className="font-medium">{q.question}</p>
                <p className="text-xs text-muted-foreground">
                  {q.type} • {q.section}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
