import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "essay-scoring",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teks 2 menuduh data dalam Teks 1 sebagai hasil rekayasa dinas pendidikan.",
        },
        {
          correct: false,
          label:
            "Teks 2 memperluas usulan Teks 1 agar mesin juga menilai ujian di sekolah swasta.",
        },
        {
          correct: true,
          label:
            "Teks 2 mengakui sebagian manfaat mesin, tetapi menolak menyerahkan nilai akhir kepadanya.",
        },
        {
          correct: false,
          label:
            "Teks 2 membahas topik yang sama sekali berbeda dari topik dalam Teks 1.",
        },
        {
          correct: false,
          label:
            "Teks 2 mendukung sepenuhnya rencana dinas pendidikan dalam Teks 1.",
        },
      ],
    },
  },
};

export default item;
