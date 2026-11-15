import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "cuckoo-eggs",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The field experiments confirm the textbook view that hosts usually fail to notice cuckoo eggs.",
        },
        {
          column: 1,
          label:
            "A warbler that has not seen a cuckoo near its nest may keep an odd egg even in a reed bed where cuckoos are common.",
        },
        {
          column: 2,
          label:
            "The close match between cuckoo eggs and host eggs is the passage's main evidence that hosts weigh risks.",
        },
        {
          column: 1,
          label:
            "The risk of throwing out its own unusual eggs is one reason a warbler can gain from accepting odd eggs where cuckoos are rare.",
        },
        {
          column: 1,
          label:
            "If cuckoos became common again in the English reed bed, the passage gives reason to expect rejection there to rise within years rather than over many generations.",
        },
      ],
    },
  },
};

export default item;
