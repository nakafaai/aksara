import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "homework-limits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Run it for a full school year with Years 3 to 6, and survey parents each month about arguments and bedtimes.",
        },
        {
          correct: true,
          label: "Include older pupils, and compare them with similar pupils in the same year who keep homework, on tests that count.",
        },
        {
          correct: false,
          label: "Keep Years 3 to 6, add a second term, and compare the scores with the average of the last three years.",
        },
        {
          correct: false,
          label: "Include older pupils for one term, and ask their teachers to rate each pupil's effort in the end-of-term tests.",
        },
        {
          correct: false,
          label: "Compare the pilot pupils with the same year groups the year before, on tests that count towards their grades.",
        },
      ],
    },
  },
};

export default item;
