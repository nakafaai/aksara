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
          label:
            "Continuous flow is still suspected, so keep the records and contact the responsible manager or a qualified plumber.",
        },
        {
          isCorrect: false,
          label:
            "The leak must be behind the nearest wall, so that section should be opened immediately.",
        },
        {
          isCorrect: false,
          label:
            "The repeated movement proves the meter is faulty, so replace it before recording the result.",
        },
        {
          isCorrect: false,
          label:
            "Dry visible fixtures rule out continuous flow, so no further action is needed.",
        },
        {
          isCorrect: false,
          label:
            "Delete the first readings because they cannot help a later inspection locate the problem.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
