import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pusat $$(-2,5)$$ dan jari-jari $$3$$",
        },
        {
          correct: false,
          label: "Pusat $$(2,-5)$$ dan jari-jari $$9$$",
        },
        {
          correct: true,
          label: "Pusat $$(2,-5)$$ dan jari-jari $$3$$",
        },
        {
          correct: false,
          label: "Pusat $$(4,-10)$$ dan jari-jari $$3$$",
        },
        {
          correct: false,
          label: "Pusat $$(2,-5)$$ dan jari-jari $$7$$",
        },
      ],
    },
  },
};

export default item;
