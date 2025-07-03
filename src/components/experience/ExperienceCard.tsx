// src/components/ExperienceCard.tsx
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
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start text-sm text-muted-foreground">
              <div className="flex gap-3 font-medium">
                <span>{experience.companyName}</span>
                <span>•</span>
                <span>{experience.title}</span>
              </div>
              <span className="text-xs">{dateLabel}</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {experience.position} • {experience.experienceType}
            </p>
            <p className="text-sm line-clamp-3">{experience.summary}</p>
          </CardContent>

          <CardFooter>
            <Button variant="link" className="px-0 text-sm">
              View details →
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      {/* ───── Dialog ───── */}
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
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

/* ---------- Inline demo data & quick showcase ---------- */
const demoExperiences: Experience[] = [
  {
    id: 1,
    title: "Amazon SDE-1 Final HR Round",
    position: "SDE-1",
    companyName: "Amazon",
    experienceType: "HR",
    interviewDate: "2024-06-01",
    summary:
      "Discussed leadership principles, team conflict resolution, and career goals. Very conversational round with a focus on behavioral traits.",
    questions: [
      {
        question:
          "Which Amazon leadership principle resonates most with you and why?",
        type: "HR",
        section: "HR",
      },
      {
        question:
          "Tell me about a time you took initiative without being asked.",
        type: "Behavioral",
        section: "HR",
      },
    ],
  },
  {
    id: 2,
    title: "Google L3 System Design + DSA",
    position: "Software Engineer",
    companyName: "Google",
    experienceType: "TECHNICAL",
    interviewDate: "2024-04-15",
    summary:
      "Started with DSA questions on Trees and DP, then moved into designing a scalable file storage system like Dropbox.",
    questions: [
      {
        question: "Design a scalable file storage system (like Dropbox).",
        type: "System Design",
        section: "Technical",
      },
      {
        question: "Find the longest palindromic subsequence in a string.",
        type: "Algorithm",
        section: "Technical",
      },
    ],
  },
];

export function DemoExperienceFeed() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {demoExperiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
}
