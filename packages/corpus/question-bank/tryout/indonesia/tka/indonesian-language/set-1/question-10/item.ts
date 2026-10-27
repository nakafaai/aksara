import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "harbor-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Awalnya lampu mempertahankan ingatan tentang ayahnya.",
        },
        {
          correct: false,
          label:
            "Saat hujan, Raka menunggu penjaga pantai menemukan perahu tanpa memberi sinyal.",
        },
        {
          correct: false,
          label: "Pada akhir cerita, lampu menjadi alasan menjual dermaga.",
        },
        {
          correct: true,
          label:
            "Pada akhir cerita, kebiasaan pribadi berkembang menjadi kepedulian bersama.",
        },
      ],
    },
  },
};

export default item;
