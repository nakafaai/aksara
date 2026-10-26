import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "mapmakers-ink",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jembatan bambu patah.",
        },
        {
          correct: true,
          label: "Papan penyeberangan licin.",
        },
        {
          correct: true,
          label: "Pagar baru menutup jalan.",
        },
        {
          correct: false,
          label:
            "Lebar jalur pada peta dianggap cukup untuk memperkirakan akses kursi roda.",
        },
      ],
    },
  },
};

export default item;
