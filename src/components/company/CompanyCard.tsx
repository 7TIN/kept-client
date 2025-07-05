// src/components/company/CompanyCard.tsx
import { Card } from "@/components/ui/card";

interface Props {
  name: string;
  experienceCount: number;
  onClick?: () => void;
}

export function CompanyCard({ name, experienceCount, onClick }: Props) {
  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer hover:bg-muted/40 transition shadow-sm"
    >
      <div className="font-medium text-lg">{name}</div>
      <div className="text-sm text-muted-foreground">
        {experienceCount} experience{experienceCount !== 1 && "s"}
      </div>
    </Card>
  );
}
