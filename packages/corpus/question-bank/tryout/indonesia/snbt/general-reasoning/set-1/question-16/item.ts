import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mie instan sebaiknya dikonsumsi sesekali, dengan bumbu yang dikurangi serta tambahan sayuran dan protein.",
        },
        {
          correct: false,
          label:
            "Mie instan menyediakan seluruh zat gizi yang dibutuhkan tubuh jika dimakan setiap hari.",
        },
        {
          correct: false,
          label:
            "Mengganti air rebusan menghilangkan seluruh natrium dari mie instan.",
        },
        {
          correct: false,
          label:
            "Memasak mie instan dengan minyak zaitun membuat porsi tanpa batas menjadi sehat.",
        },
        {
          correct: false,
          label:
            "Menambahkan sayuran sepenuhnya meniadakan natrium dalam bumbu.",
        },
      ],
    },
  },
};

export default item;
