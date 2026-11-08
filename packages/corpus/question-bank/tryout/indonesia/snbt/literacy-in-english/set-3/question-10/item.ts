import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "four-day-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A law requiring bus companies to close on Fridays for staff rest",
        },
        {
          correct: false,
          label: "A rule moving companies to four ten-hour days from next year",
        },
        {
          correct: true,
          label:
            "A publicly funded trial in care homes with results published either way",
        },
        {
          correct: false,
          label:
            "A ban on trials that fail to report positive results to the public",
        },
        {
          correct: false,
          label:
            "A plan to stop collecting data once a trial has begun in a company",
        },
      ],
    },
  },
};

export default item;
