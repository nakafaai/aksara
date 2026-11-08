import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "rabies",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Gejala bisa muncul berminggu-minggu kemudian, saat korban sudah hampir tidak tertolong.",
        },
        {
          correct: false,
          label:
            "Vaksin antirabies hanya tersedia di fasilitas kesehatan pada hari yang sama dengan gigitan.",
        },
        {
          correct: false,
          label:
            "Luka gigitan anjing selalu menimbulkan gejala rabies dalam waktu satu hari setelah digigit.",
        },
        {
          correct: false,
          label:
            "Virus rabies tidak dapat bergerak melalui saraf jika korban segera mencuci lukanya.",
        },
        {
          correct: false,
          label:
            "Anjing yang menggigit manusia di Indonesia pasti sudah mendapat vaksin antirabies.",
        },
      ],
    },
  },
};

export default item;
