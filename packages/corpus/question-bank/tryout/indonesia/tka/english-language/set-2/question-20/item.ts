import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The document uses the longest possible wording.",
        },
        {
          correct: false,
          label:
            "The plan is usable when its organizer can quickly find the cards during practice.",
        },
        {
          correct: false,
          label:
            "The practice checks the route but leaves the accessibility of alerts untested.",
        },
        {
          correct: true,
          label:
            "Household members can reach the meeting point and state the contact during practice.",
        },
        {
          correct: false,
          label: "The plan has not changed for many years.",
        },
      ],
    },
  },
  stimulus: "emergency-plan",
};

export default item;
