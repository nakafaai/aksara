import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "liquefaction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air hujan yang turun selama gempa mengubah tanah menjadi lumpur.",
        },
        {
          correct: true,
          label:
            "Tekanan air di rongga naik sehingga butir pasir tidak lagi saling bertumpu.",
        },
        {
          correct: false,
          label:
            "Butir-butir pasir hancur menjadi debu halus ketika diguncang gempa yang kuat.",
        },
        {
          correct: false,
          label:
            "Tanah liat melekat pada butir pasir dan membuat butiran itu licin.",
        },
        {
          correct: false,
          label:
            "Bangunan di atasnya mungkin terlalu berat sehingga tanah ambles.",
        },
      ],
    },
  },
};

export default item;
