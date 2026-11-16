import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "support-and-movement-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$60\\%$$ slow fibres" },
        { correct: false, label: "$$65\\%$$ slow fibres" },
        { correct: false, label: "$$68\\%$$ slow fibres" },
        { correct: false, label: "$$40\\%$$ slow fibres" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$60\\%$$ gentian perlahan" },
        { correct: false, label: "$$65\\%$$ gentian perlahan" },
        { correct: false, label: "$$68\\%$$ gentian perlahan" },
        { correct: false, label: "$$40\\%$$ gentian perlahan" },
      ],
    },
  },
};

export default item;
