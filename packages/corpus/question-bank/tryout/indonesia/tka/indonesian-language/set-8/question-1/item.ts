import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "sea-sasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "persetujuan atau izin resmi untuk memungut lola",
        },
        { correct: true, label: "hukuman bagi orang yang melanggar aturan" },
        { correct: false, label: "upacara untuk membuka masa larangan" },
        { correct: false, label: "kelompok penjaga yang mengawasi terumbu" },
        {
          correct: false,
          label: "hasil penjualan lola yang masuk ke kas negeri",
        },
      ],
    },
  },
};

export default item;
