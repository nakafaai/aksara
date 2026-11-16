import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About 60 s, because the time falls by 20 s for every 10 °C",
        },
        {
          correct: true,
          label:
            "About 20 s, because the rate roughly doubles for every 10 °C rise as more colliding particles have at least the activation energy",
        },
        {
          correct: false,
          label: "About 20 s, because the particles get larger when heated",
        },
        {
          correct: false,
          label:
            "The cross disappears at once, because the reaction has no activation energy at 50 °C",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kira-kira 60 s, kerana masa berkurang 20 s bagi setiap 10 °C",
        },
        {
          correct: true,
          label:
            "Kira-kira 20 s, kerana kadar lebih kurang berganda dua bagi setiap kenaikan 10 °C apabila lebih banyak zarah yang berlanggar mempunyai sekurang-kurangnya tenaga pengaktifan",
        },
        {
          correct: false,
          label:
            "Kira-kira 20 s, kerana zarah menjadi lebih besar apabila dipanaskan",
        },
        {
          correct: false,
          label:
            "Tanda pangkah hilang serta-merta, kerana tindak balas tiada tenaga pengaktifan pada 50 °C",
        },
      ],
    },
  },
};

export default item;
