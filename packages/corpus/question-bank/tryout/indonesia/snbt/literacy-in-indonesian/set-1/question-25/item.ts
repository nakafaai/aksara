import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "tone-attitude",
  },
  stimulus: "kawi-script",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berhati-hati membedakan hubungan yang sudah mapan dari hubungan yang belum dapat dipastikan.",
        },
        {
          correct: false,
          label:
            "Meragukan bahwa aksara Kawi pernah dipakai di luar Pulau Jawa.",
        },
        {
          correct: false,
          label:
            "Menolak pendapat para ahli tentang asal-usul aksara Nusantara.",
        },
        {
          correct: false,
          label:
            "Yakin bahwa seluruh aksara Nusantara berasal langsung dari aksara Kawi.",
        },
        {
          correct: false,
          label:
            "Menganggap asal-usul aksara di Sumatra dan Sulawesi tidak penting untuk dibahas.",
        },
      ],
    },
  },
};

export default item;
