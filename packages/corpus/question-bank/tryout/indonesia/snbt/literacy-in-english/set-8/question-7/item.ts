import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "driverless-liability",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The comparison fails because a lift, unlike a car, is used every day by people who never bought it.",
        },
        {
          correct: false,
          label:
            "The comparison shows that victims should be able to claim directly from the company that made the faulty product.",
        },
        {
          correct: true,
          label:
            "The comparison fits crashes caused by a design fault, but not crashes in which the owner ignored warnings or used the system where it was not approved.",
        },
        {
          correct: false,
          label:
            "The comparison is sound, so an owner's insurance premium should not depend on how the owner uses the system.",
        },
        {
          correct: false,
          label:
            "The comparison fails because the homeowner, like the car owner, chose to buy the product and so accepted its risks.",
        },
      ],
    },
  },
};

export default item;
