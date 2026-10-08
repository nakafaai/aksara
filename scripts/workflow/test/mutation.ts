/** Replaces one source fragment only inside its owning job. */
export function mutateJob(
  workflow: string,
  job: string,
  from: string,
  to: string
) {
  const start = workflow.indexOf(`\n  ${job}:`);
  const nextJob = /\n {2}[a-z][a-z_]*:\n/gu;
  nextJob.lastIndex = start + 1;
  const match: RegExpExecArray | null = nextJob.exec(workflow);
  const end = match?.index ?? workflow.length;
  return `${workflow.slice(0, start)}${workflow.slice(start, end).replace(from, to)}${workflow.slice(end)}`;
}
