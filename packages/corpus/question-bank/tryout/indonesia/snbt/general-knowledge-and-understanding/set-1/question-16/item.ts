import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "litium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Keyakinan para nelayan bahwa musim ikan akan segera tiba makin menebal setelah angin berganti arah.",
        },
        {
          correct: false,
          label:
            "Asap dari tumpukan sampah yang dibakar itu menebal hingga menutupi jalan kampung.",
        },
        {
          correct: false,
          label: "Rumput liar di pematang sawah menebal selama musim hujan.",
        },
        {
          correct: false,
          label:
            "Huruf pada judul poster itu menebal setelah perancangnya memilih jenis huruf yang lain.",
        },
        {
          correct: true,
          label:
            "Kerak kapur di dasar ketel itu menebal karena air sadah terus direbus di dalamnya.",
        },
      ],
    },
  },
};

export default item;
