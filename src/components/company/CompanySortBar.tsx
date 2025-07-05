// src/pages/CompaniesPage.tsx
// import type CompanyList from "@/components/company/CompanyList";

import { CompanyList } from "./CompanyGrid";

export default function CompaniesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <CompanyList />
    </div>
  );
}
