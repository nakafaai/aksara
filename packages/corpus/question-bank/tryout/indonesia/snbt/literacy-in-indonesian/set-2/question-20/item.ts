import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Rp$$28{.}000$$ per kilogram" },
        { correct: true, label: "Rp$$32{.}250$$ per kilogram" },
        { correct: false, label: "Rp$$32{.}000$$ per kilogram" },
        { correct: false, label: "Rp$$30{.}000$$ per kilogram" },
        { correct: false, label: "Rp$$33{.}000$$ per kilogram" },
      ],
    },
  },
};

export default item;
