import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "chess-draw",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Bima terus menyerang dengan bersemangat." },
        {
          correct: true,
          label: "Bidak-bidak kecil Kakek maju perlahan di sisi kiri papan.",
        },
        {
          correct: false,
          label: "Kakek kembali mengusap dagu, lalu mengaku kalah.",
        },
        {
          correct: true,
          label:
            "Bima menarik pasukannya mundur untuk menghadang bidak yang hampir menjadi menteri.",
        },
      ],
    },
  },
};

export default item;
