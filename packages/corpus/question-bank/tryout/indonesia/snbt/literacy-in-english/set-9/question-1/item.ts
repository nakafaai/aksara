import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "tambora-1816",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tambora cooled distant regions, though the link was understood much later.",
        },
        {
          correct: false,
          label:
            "Mary Shelley wrote *Frankenstein* because she was frightened by news of a distant volcano.",
        },
        {
          correct: false,
          label:
            "Ice cores prove that volcanoes cause most cold summers in Europe.",
        },
        {
          correct: false,
          label:
            "The eruption mainly harmed people on Sumbawa and the nearby islands.",
        },
        {
          correct: false,
          label:
            "People in 1816 blamed Tambora for the snow that fell in New England.",
        },
      ],
    },
  },
};

export default item;
