import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "zoo-purpose",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Build a much larger enclosure in order to add a second herd of elephants.",
        },
        {
          correct: false,
          label:
            "Replace its breeding programmes with more shows for visitors.",
        },
        {
          correct: false,
          label:
            "Release all of its penguins into the nearest park to free up space.",
        },
        {
          correct: true,
          label:
            "Move its polar bears elsewhere and expand breeding of a threatened local frog.",
        },
        {
          correct: false,
          label: "Buy more famous animals so that visitor numbers keep rising.",
        },
      ],
    },
  },
};

export default item;
