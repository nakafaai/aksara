import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "bike-tire",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "a goal, a list of materials, steps, and the results of a test",
        },
        {
          correct: false,
          label: "a claim, three supporting reasons, and a conclusion",
        },
        {
          correct: false,
          label: "a setting, a conflict, and the way the conflict is solved",
        },
        {
          correct: false,
          label: "numbered steps, a list of tools, and a summary",
        },
        {
          correct: true,
          label: "a title, the tools you need, numbered steps, and a tip",
        },
      ],
    },
  },
};

export default item;
