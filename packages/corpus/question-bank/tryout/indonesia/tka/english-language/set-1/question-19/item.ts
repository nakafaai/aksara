import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "leak-test",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Continuous flow is still suspected, so keep the records and contact the responsible manager or a qualified plumber.",
        },
        {
          correct: false,
          label:
            "The leak must be behind the nearest wall, so that section should be opened immediately.",
        },
        {
          correct: false,
          label:
            "The repeated movement proves the meter is faulty, so replace it before recording the result.",
        },
        {
          correct: false,
          label:
            "Dry visible fixtures rule out continuous flow, so no further action is needed.",
        },
        {
          correct: false,
          label:
            "Delete the first readings because they cannot help a later inspection locate the problem.",
        },
      ],
    },
  },
};

export default item;
