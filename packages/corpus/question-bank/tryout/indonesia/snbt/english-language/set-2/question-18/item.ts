import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Who invented the first electronic computer?",
        },
        {
          isCorrect: false,
          label: "Which country has the cheapest office rent?",
        },
        {
          isCorrect: true,
          label:
            "How could GenAI transform occupational tasks, and what factors shape the outcome?",
        },
        {
          isCorrect: false,
          label: "How can every human task be removed immediately?",
        },
        {
          isCorrect: false,
          label: "Why should all workers avoid digital tools?",
        },
      ],
    },
  },
};

export default item;
