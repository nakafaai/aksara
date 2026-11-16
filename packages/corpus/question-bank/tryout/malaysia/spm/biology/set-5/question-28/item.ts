import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\%$$ and $$80\\%$$" },
        { correct: true, label: "$$56\\%$$ and $$41\\%$$" },
        { correct: false, label: "$$56\\%$$ and $$80\\%$$" },
        { correct: false, label: "$$32\\%$$ and $$64\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10\\%$$ dan $$80\\%$$" },
        { correct: true, label: "$$56\\%$$ dan $$41\\%$$" },
        { correct: false, label: "$$56\\%$$ dan $$80\\%$$" },
        { correct: false, label: "$$32\\%$$ dan $$64\\%$$" },
      ],
    },
  },
};

export default item;
