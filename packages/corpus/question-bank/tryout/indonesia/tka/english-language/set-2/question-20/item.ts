import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The document uses the longest possible wording.",
        },
        {
          isCorrect: false,
          label:
            "The plan is usable when its organizer can quickly find the cards during practice.",
        },
        {
          isCorrect: false,
          label:
            "The practice checks the route but leaves the accessibility of alerts untested.",
        },
        {
          isCorrect: true,
          label:
            "Household members can reach the meeting point and state the contact during practice.",
        },
        {
          isCorrect: false,
          label: "The plan has not changed for many years.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
