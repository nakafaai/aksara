import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "silted-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Embung di Desa Watugede tidak lagi memerlukan perawatan.",
        },
        {
          correct: true,
          label:
            "Pengerukan lumpur dan penanaman pohon memulihkan embung sehingga airnya kembali cukup sepanjang musim kemarau.",
        },
        {
          correct: false,
          label: "Lumpur di embung berasal dari kebun warga.",
        },
        {
          correct: false,
          label: "Hujan tidak lagi turun di bukit sekitar embung.",
        },
        {
          correct: false,
          label: "Kebun warga kini tidak memerlukan air dari embung.",
        },
      ],
    },
  },
};

export default item;
