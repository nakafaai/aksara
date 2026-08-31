import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Further inspection by a responsible person is needed.",
        },
        {
          isCorrect: false,
          label: "The exact location of the leak is already known.",
        },
        {
          isCorrect: false,
          label:
            "The meter should be replaced before a second reading is attempted.",
        },
        {
          isCorrect: false,
          label:
            "Visible wall sections should be opened as soon as the indicator first moves.",
        },
        {
          isCorrect: false,
          label: "The photographs should be deleted.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
