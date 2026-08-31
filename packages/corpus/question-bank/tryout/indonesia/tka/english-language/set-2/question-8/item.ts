import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The pale lettering on the original signs would have become darker by itself during rain.",
        },
        {
          isCorrect: false,
          label:
            "The robotics symbols could be understood before a parent finished reading.",
        },
        {
          isCorrect: true,
          label:
            "The alternative entrance had a step, while its portable ramp was stored in a locked room.",
        },
        {
          isCorrect: false,
          label:
            "The moved displays made the original doorway wider than the alternative entrance.",
        },
        {
          isCorrect: false,
          label:
            "The fair would necessarily start early because fewer visitors would use the nearest entrance.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
