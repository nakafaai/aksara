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
          label:
            "To make the meter move faster so that a hidden leak would become easier to locate",
        },
        {
          isCorrect: true,
          label:
            "To reduce the chance that unreported accidental use caused the change",
        },
        {
          isCorrect: false,
          label:
            "To identify the exact pipe behind the wall from a single change in the meter reading",
        },
        {
          isCorrect: false,
          label:
            "To reset the irrigation timer so that scheduled use would no longer affect later readings",
        },
        {
          isCorrect: false,
          label:
            "To prevent the first meter reading from influencing the value recorded after the waiting period",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
