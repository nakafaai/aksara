import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "land-subsidence",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Sekitar $$27$$ tahun" },
        { correct: true, label: "Sekitar $$25$$ tahun" },
        { correct: false, label: "Sekitar $$29$$ tahun" },
        { correct: false, label: "Sekitar $$114$$ tahun" },
        { correct: false, label: "Sekitar $$400$$ tahun" },
      ],
    },
  },
};

export default item;
