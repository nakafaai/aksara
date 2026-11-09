import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "lost-cat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bu Wening menyerahkan Puspa kepada tukang sayur",
        },
        { correct: false, label: "Nayla berhenti mengunjungi Bu Wening" },
        {
          correct: false,
          label: "Puspa dan anak-anaknya dikembalikan ke gudang beras",
        },
        {
          correct: true,
          label:
            "Nayla meminta izin Bu Wening untuk memelihara salah satu anak kucing",
        },
        {
          correct: false,
          label: "Nayla membuat selebaran baru untuk mencari Puspa",
        },
      ],
    },
  },
};

export default item;
