import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "lost-cat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Puspa ditemukan di gudang beras dekat pasar.",
        },
        {
          correct: false,
          label: "Puspa ditemukan di bawah teras rumah Bu Wening.",
        },
        {
          correct: true,
          label: "Tempat itu berjarak dua kilometer dari rumah.",
        },
        { correct: true, label: "Puspa berada di antara tumpukan karung." },
      ],
    },
  },
};

export default item;
