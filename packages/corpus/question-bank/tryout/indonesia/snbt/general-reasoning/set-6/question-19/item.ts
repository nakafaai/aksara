import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pak Harun adalah petani Desa Mekar.",
        },
        {
          correct: false,
          label: "Pak Harun bukan petani Desa Mekar.",
        },
        {
          correct: false,
          label: "Semua anggota koperasi meminjam alat panen.",
        },
        {
          correct: true,
          label: "Pak Harun adalah anggota koperasi.",
        },
        {
          correct: false,
          label: "Sebagian petani Desa Mekar meminjam alat panen.",
        },
      ],
    },
  },
};

export default item;
