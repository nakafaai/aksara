import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "old-letter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Hasan menang di babak final lomba geografi.",
        },
        {
          correct: true,
          label:
            "Amplop surat itu ditujukan kepada siapa pun yang meminjam atlas sesudah Hasan.",
        },
        { correct: true, label: "Hasan mengaku hampir membuang atlas itu." },
        {
          correct: true,
          label: "Hasan menyarankan pembaca melihat peta lama-lama.",
        },
      ],
    },
  },
};

export default item;
