import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "rain-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lapangan tergenang setiap curah hujan lebih dari 20 milimeter.",
        },
        {
          correct: false,
          label:
            "Sekolah langsung memperbesar saluran air di sekitar lapangan.",
        },
        {
          correct: true,
          label:
            "Lapangan tetap kering walaupun curah hujan mencapai 25 milimeter.",
        },
        {
          correct: false,
          label: "Upacara dipindahkan ke tempat yang tidak tergenang.",
        },
        {
          correct: false,
          label: "Siswa berhenti mencatat tinggi air hujan.",
        },
      ],
    },
  },
};

export default item;
