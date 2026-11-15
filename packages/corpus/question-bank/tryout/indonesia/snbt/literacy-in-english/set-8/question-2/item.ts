import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "phineas-gage",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Gage's behaviour seems to have changed after the injury, but he later held a demanding job for years, so the change may not have been permanent.",
        },
        {
          correct: false,
          label:
            "Gage's behaviour seems to have changed after the injury, but his friends later admitted that they had exaggerated, so the change may never have happened.",
        },
        {
          correct: false,
          label:
            "Gage's behaviour seems to have changed after the injury, and he later held a demanding job for years, which proves that his later routine cured him.",
        },
        {
          correct: false,
          label:
            "Gage's behaviour changed for good after the injury, although he later found work driving coaches in Chile.",
        },
        {
          correct: false,
          label:
            "Gage's behaviour seems to have changed after the injury, and his later fights and heavy drinking show the change lasted.",
        },
      ],
    },
  },
};

export default item;
