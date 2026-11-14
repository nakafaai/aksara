import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "loud-exhaust",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "*Desibel* berarti satuan untuk mengukur kerasnya bunyi.",
        },
        {
          correct: false,
          label: "*Pabrik* berarti bengkel kecil tempat knalpot diganti.",
        },
        {
          correct: true,
          label:
            "*Spanduk* berarti kain rentang bertuliskan pesan yang dipasang di tempat umum.",
        },
        {
          correct: false,
          label: "*Konsentrasi* berarti suara mesin yang sangat keras.",
        },
      ],
    },
  },
};

export default item;
