import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Open layouts may reduce visual and acoustic privacy.",
        },
        {
          isCorrect: true,
          label: "Removing walls always increases face-to-face collaboration.",
        },
        {
          isCorrect: false,
          label:
            "Private offices received the highest satisfaction ratings in one study.",
        },
        {
          isCorrect: false,
          label: "The two field studies found more electronic communication.",
        },
        {
          isCorrect: false,
          label: "The best layout may depend on tasks and communication needs.",
        },
      ],
    },
  },
};

export default item;
