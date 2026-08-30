import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To make the meter move faster",
        },
        {
          isCorrect: false,
          label: "To locate the exact pipe behind a wall",
        },
        {
          isCorrect: false,
          label: "To reset the irrigation timer permanently",
        },
        {
          isCorrect: true,
          label:
            "To reduce the chance that unreported accidental use caused the change",
        },
        {
          isCorrect: false,
          label: "To avoid recording the first reading",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
