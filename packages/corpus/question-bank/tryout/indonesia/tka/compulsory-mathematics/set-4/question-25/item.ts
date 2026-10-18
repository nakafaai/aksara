import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 2,
          label:
            "Peluang jarum berhenti di juring $$C$$ paling sedikit satu kali adalah $$\\frac{1}{3}$$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Peluang kedua putaran berhenti di juring yang sama adalah $$\\frac{7}{18}$$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Peluang putaran pertama berhenti di juring $$A$$ dan putaran kedua tidak berhenti di juring $$A$$ adalah $$\\frac{1}{4}$$.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Kejadian \"putaran pertama berhenti di juring $$A$$\" dan kejadian \"kedua putaran berhenti di juring yang sama\" saling bebas.",
        },
      ],
    },
  },
};

export default item;
