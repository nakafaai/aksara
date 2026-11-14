import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "old-letter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ia menerima atlas baru karena atlas lama dibuang",
        },
        {
          correct: false,
          label: "ia diminta Bu Rina mengembalikan surat itu kepada Hasan",
        },
        {
          correct: false,
          label: "ia tidak menemukan surat apa pun karena Wulan menyimpannya",
        },
        {
          correct: false,
          label: "ia membaca surat panjang tentang pengalaman Wulan di lomba",
        },
        {
          correct: true,
          label:
            "ia menemukan surat Hasan beserta kertas berisi kalimat Wulan terselip bersama di dalam atlas",
        },
      ],
    },
  },
};

export default item;
