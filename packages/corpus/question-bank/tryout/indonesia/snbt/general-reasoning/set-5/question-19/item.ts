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
          label: "Semua pemakai lencana biru lulus ujian bahasa Jepang.",
        },
        {
          correct: false,
          label:
            "Sebagian pemandu yang lulus ujian bahasa Jepang bertugas di galeri lantai dua.",
        },
        {
          correct: false,
          label:
            "Tidak ada petugas akhir pekan yang lulus ujian bahasa Jepang.",
        },
        {
          correct: true,
          label:
            "Sebagian pemakai lencana biru tidak bertugas pada akhir pekan.",
        },
        {
          correct: false,
          label: "Semua petugas galeri lantai dua memakai lencana biru.",
        },
      ],
    },
  },
};

export default item;
