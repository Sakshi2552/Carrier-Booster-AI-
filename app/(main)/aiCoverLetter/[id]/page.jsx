import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCoverLetter } from "@/actions/coverLetter"; // ✅ use this
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function CoverLetterPage({ params }) {
  const { id } = params;
  const coverLetter = await getCoverLetter(id); // ✅ fetch from DB

  if (!coverLetter) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold">Cover letter not found</h1>
        <Link href="/aiCoverLetter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/aiCoverLetter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-6xl font-bold gradient-title mb-6">
          {coverLetter.jobTitle} at {coverLetter.companyName}
        </h1>
      </div>
      <CoverLetterPreview content={coverLetter.content} />
    </div>
  );
}
