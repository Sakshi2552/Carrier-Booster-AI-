
import React from "react";
import CoverLetterGenerator from "../_components/cover-letter-generator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
const newLetter = () => {
    return <div className="space-y-4">
        <Link href={"/aiCoverLetter"}>
            <Button variant="link" className="gap-2 pl-0">
                <ArrowLeft className="h-4 w-4" />
                Back to Cover Letters
            </Button>
        </Link>
        <h1 className="text-6xl font-bold">
            Create Cover Letter
        </h1>
        <p className="text-muted-foreground">
            Generate a tailored cover letter for job application
        </p>
        <CoverLetterGenerator/>
    </div>
}
export default newLetter;