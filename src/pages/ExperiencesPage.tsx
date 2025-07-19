import { useMemo, useState, useEffect } from "react";
import debounce from "debounce";
import { ShareExperienceDialog } from "@/components/experience/ShareExperienceDialog";
import ExperienceFeed from "@/components/experience/ExperienceFeed";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ExperiencesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(""); // Track current input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Track debounced input
  const [position, setPosition] = useState("");
  const [type, setType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Debounced setter only runs AFTER user stops typing (true debounce)
  const debouncedSetter = useMemo(
    () => debounce((val) => setDebouncedSearch(val), 400), // 600ms debounce
    []
  );

  useEffect(() => {
    debouncedSetter(search);
    // Cleanup if component unmounts
    return debouncedSetter.clear;
  }, [search, debouncedSetter]);

  const companyName = searchParams.get("company") ?? "";

  const handleAddExperienceClick = () => {

    const token = localStorage.getItem("token");

    if (token) {

      setIsDialogOpen(true);
    } else {

      const redirectUrl = location.pathname + location.search;
      navigate(`/login?message=login_required&redirect=${encodeURIComponent(redirectUrl)}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Interview Experiences</h1>
        <Button onClick={handleAddExperienceClick}>Add Experience</Button>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <input
          placeholder="Search title or summary..."
          value={search} // controlled input!
          onChange={e => setSearch(e.target.value)} // update search state
          className="border px-3 py-1.5 rounded-md w-full sm:w-60"
        />
        <input
          placeholder="Filter by position"
          value={position}
          onChange={e => setPosition(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-full sm:w-44"
        />
        <label className="text-sm text-muted-foreground w-full sm:w-44">
          Filter by Type
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="border px-3 py-1.5 rounded-md w-full"
          >
            <option value="">All Types</option>
            <option value="TECHNICAL">Technical</option>
            <option value="HR">HR</option>
            <option value="MR">MR</option>
          </select>
        </label>
        {companyName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtered&nbsp;by:</span>
            <div className="bg-muted rounded px-3 py-1 flex items-center text-sm gap-2">
              Company: {companyName}
              <button
                onClick={() => {
                  searchParams.delete("company");
                  setSearchParams(searchParams);
                }}
                className="hover:text-destructive text-muted-foreground text-xs leading-none"
                aria-label="Remove company filter"
              >✕</button>
            </div>
          </div>
        )}
      </div>

      {/* Only update ExperienceFeed when debouncedSearch changes */}
      <ExperienceFeed filters={{ q: debouncedSearch, position, type, company: companyName }} />

      <ShareExperienceDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}