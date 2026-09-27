import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mie instan sebaiknya dikonsumsi sesekali, dengan bumbu yang dikurangi serta tambahan sayuran dan protein.",
        },
        {
          isCorrect: false,
          label:
            "Mie instan menyediakan seluruh zat gizi yang dibutuhkan tubuh jika dimakan setiap hari.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti air rebusan menghilangkan seluruh natrium dari mie instan.",
        },
        {
          isCorrect: false,
          label:
            "Memasak mie instan dengan minyak zaitun membuat porsi tanpa batas menjadi sehat.",
        },
        {
          isCorrect: false,
          label:
            "Menambahkan sayuran sepenuhnya meniadakan natrium dalam bumbu.",
        },
      ],
    },
  },
};

export default item;
