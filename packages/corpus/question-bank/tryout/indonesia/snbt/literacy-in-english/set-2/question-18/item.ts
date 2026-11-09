import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Who invented the first electronic computer?",
        },
        {
          correct: false,
          label: "Which country has the cheapest office rent?",
        },
        {
          correct: true,
          label:
            "How could GenAI transform occupational tasks, and what factors shape the outcome?",
        },
        {
          correct: false,
          label: "How can every human task be removed immediately?",
        },
        {
          correct: false,
          label: "Why should all workers avoid digital tools?",
        },
      ],
    },
  },
};

export default item;
