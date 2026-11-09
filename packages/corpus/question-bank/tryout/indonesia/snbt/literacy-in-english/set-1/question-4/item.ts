import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "octopus-arms",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "show that octopuses feel pain in the same way that humans do.",
        },
        {
          correct: false,
          label:
            "contrast fast human reflexes with the slower responses of octopus arms.",
        },
        {
          correct: false,
          label:
            "argue that human arms are more independent than octopus arms.",
        },
        {
          correct: true,
          label:
            "illustrate a response that can begin before the central brain is involved.",
        },
        {
          correct: false,
          label:
            "warn readers about the risks of handling octopuses in laboratories.",
        },
      ],
    },
  },
};

export default item;
