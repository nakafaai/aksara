import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "terdapat pola yang mendukung perbaikan layanan, tetapi faktor lain masih perlu diukur",
        },
        {
          isCorrect: false,
          label: "setiap liter air pasti menggantikan satu botol",
        },
        {
          isCorrect: false,
          label: "semua sampah botol sekolah sudah terhitung",
        },
        {
          isCorrect: false,
          label: "suhu tidak mungkin memengaruhi kebutuhan minum",
        },
        {
          isCorrect: false,
          label: "stasiun isi ulang harus dihentikan",
        },
      ],
    },
  },
  stimulusKey: "refill-station",
};

export default item;
