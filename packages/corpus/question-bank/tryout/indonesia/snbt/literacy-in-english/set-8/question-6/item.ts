import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "congestion-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It supports the charge, but argues that the $$18\\%$$ hides a much larger fall in private cars, offset by the new bus routes, which have slowed traffic again.",
        },
        {
          correct: false,
          label:
            "It supports the charge, but argues that the $$18\\%$$ overstates the fall, because exempt ride-hailing cars were left out of the count.",
        },
        {
          correct: false,
          label:
            "It supports the charge, but argues that the $$18\\%$$ hides a much larger fall in private cars, offset by exempt ride-hailing cars, so private cars should be exempted too.",
        },
        {
          correct: true,
          label:
            "It supports the charge, but argues that the $$18\\%$$ hides a much larger fall in private cars, offset by exempt ride-hailing cars that have slowed traffic again.",
        },
        {
          correct: false,
          label:
            "It rejects the charge, arguing that exempt ride-hailing cars have slowed traffic almost back to its level before the charge.",
        },
      ],
    },
  },
};

export default item;
