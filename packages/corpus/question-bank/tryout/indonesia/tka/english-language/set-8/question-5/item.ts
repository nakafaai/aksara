import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "information-validity",
  },
  stimulus: "clinic-queue",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "On a Saturday, the last numbered patient's turn begins at 11:54.",
        },
        {
          correct: true,
          label: "On a weekday, numbers $$45$$ and $$46$$ go in at 11:54.",
        },
        {
          correct: false,
          label: "On a weekday, number $$30$$ goes in at 13:18.",
        },
        {
          correct: false,
          label:
            "On a Saturday, the doctor sees $$6$$ numbered patients an hour.",
        },
        {
          correct: false,
          label: "Every patient over $$60$$ is seen by a doctor.",
        },
      ],
    },
  },
};

export default item;
