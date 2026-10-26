import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Peluang jarum berhenti di juring $$C$$ paling sedikit satu kali adalah $$\\frac{1}{3}$$.",
        },
        {
          column: 1,
          label:
            "Peluang kedua putaran berhenti di juring yang sama adalah $$\\frac{7}{18}$$.",
        },
        {
          column: 1,
          label:
            "Peluang putaran pertama berhenti di juring $$A$$ dan putaran kedua tidak berhenti di juring $$A$$ adalah $$\\frac{1}{4}$$.",
        },
        {
          column: 2,
          label:
            'Kejadian "putaran pertama berhenti di juring $$A$$" dan kejadian "kedua putaran berhenti di juring yang sama" saling bebas.',
        },
      ],
    },
  },
};

export default item;
