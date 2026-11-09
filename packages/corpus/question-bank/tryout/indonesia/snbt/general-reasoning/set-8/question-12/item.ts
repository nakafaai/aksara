import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kereta itu berangkat tepat waktu hari ini.",
        },
        {
          correct: false,
          label: "Pintu peron dibuka lebih awal daripada biasanya.",
        },
        {
          correct: false,
          label: "Kereta itu berangkat pukul 07.15 hari ini.",
        },
        {
          correct: false,
          label: "Semua penumpang sudah naik ketika kereta itu berangkat.",
        },
        {
          correct: true,
          label: "Kereta itu tidak berangkat tepat waktu hari ini.",
        },
      ],
    },
  },
};

export default item;
