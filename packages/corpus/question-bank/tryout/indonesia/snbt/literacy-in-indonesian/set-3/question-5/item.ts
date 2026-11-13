import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "wolbachia-mosquito",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia mengabaikan kemungkinan bahwa angka efikasi di Yogyakarta terlalu tinggi akibat nyamuk yang menyeberang batas klaster",
        },
        {
          correct: false,
          label:
            "ia lupa bahwa penurunan kasus di Yogyakarta mungkin hanya kebetulan jatuh pada tahun yang sepi demam berdarah",
        },
        {
          correct: false,
          label:
            "ia tidak menyadari bahwa Wolbachia baru bekerja setelah populasi nyamuk lokal dimusnahkan lebih dulu",
        },
        {
          correct: true,
          label:
            "ia menganggap perlindungan muncul sejak pelepasan dimulai dan cukup untuk menggantikan cara lama, padahal keduanya tidak didukung uji itu",
        },
        {
          correct: false,
          label:
            "ia benar soal manfaat Wolbachia, tetapi keliru soal biaya karena pelepasan nyamuk harus terus diulang tanpa henti",
        },
      ],
    },
  },
};

export default item;
