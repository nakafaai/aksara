import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "keduanya membandingkan dua jenis laboratorium",
        },
        {
          correct: false,
          label:
            "paragraf kedua berisi simpulan, paragraf ketiga berisi definisi",
        },
        {
          correct: false,
          label: "keduanya menjelaskan alasan program dihentikan",
        },
        {
          correct: false,
          label:
            "paragraf kedua memaparkan masalah yang membuat solusi pada paragraf ketiga kurang relevan",
        },
        {
          correct: true,
          label:
            "paragraf kedua menyatakan masalah, paragraf ketiga menunjukkan dampak perbaikannya",
        },
      ],
    },
  },
  stimulus: "seed-library",
};

export default item;
