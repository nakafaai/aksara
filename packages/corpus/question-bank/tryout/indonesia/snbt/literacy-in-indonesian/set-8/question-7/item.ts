import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "symbol",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Harun mencatat orang-orang yang masih berutang kepadanya, dan coretan menandai utang yang sudah lunas.",
        },
        {
          correct: true,
          label:
            "Pak Harun mencatat pelanggan tetap yang masih ia layani, dan coretan menandai pelanggan yang sudah tidak datang lagi.",
        },
        {
          correct: false,
          label:
            "Pak Harun mencatat nama-nama koran yang akan berhenti terbit, dan coretan menandai koran yang sudah berhenti.",
        },
        {
          correct: false,
          label:
            "Pak Harun mencatat calon pembeli lapaknya, dan coretan menandai orang yang menolak membelinya.",
        },
        {
          correct: false,
          label:
            "Pak Harun mencatat penumpang bus yang sering lewat, dan coretan menandai penumpang yang pindah terminal.",
        },
      ],
    },
  },
};

export default item;
