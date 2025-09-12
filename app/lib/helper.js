export function entriesToMarkdown(enteries,type){
    if(!enteries?.length) return "";
    return (
        `## ${type}\n\n` +
        enteries
          .map((entry) => {
            const dateRange = entry.current
              ? `${entry.startDate} - Present`
              : `${entry.startDate} - ${entry.endDate}`;
            return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
          })
          .join("\n\n")
      );
}