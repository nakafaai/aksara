import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Defining *actionable information* proves that the alert will work equally well during a real flood.",
        },
        {
          isCorrect: false,
          label:
            "The definition makes the measured comparison and consultation unnecessary.",
        },
        {
          isCorrect: false,
          label:
            "The term applies to any detailed flood description, even when no next action is stated.",
        },
        {
          isCorrect: true,
          label:
            "The definition explains why the safe route is essential: the message must tell households what to do and why the stated flood depth makes that action necessary.",
        },
        {
          isCorrect: false,
          label:
            "The definition shows that naming the street alone is enough, even if the alert omits the safe route.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
