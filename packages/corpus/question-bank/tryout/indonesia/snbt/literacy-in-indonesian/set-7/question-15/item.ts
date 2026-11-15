import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "plastic-levy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Teks B menerima angka Teks A, tetapi mempersoalkan apakah angka itu mengukur hal yang menentukan keberhasilan kebijakan.",
        },
        {
          correct: false,
          label:
            "Teks B menolak angka Teks A dan menggantinya dengan data penjualan kantong sampah yang dianggap lebih jujur.",
        },
        {
          correct: false,
          label:
            "Teks B mendukung Teks A sepenuhnya, lalu menambahkan contoh dari Inggris sebagai bukti tambahan keberhasilan cukai.",
        },
        {
          correct: false,
          label:
            "Teks B menolak cukai, karena tas pengganti menurut kajian Inggris lebih merusak lingkungan daripada kantong plastik.",
        },
        {
          correct: false,
          label:
            "Teks B membahas masalah lain yang tidak berhubungan dengan cukai, yaitu dampak pemanasan global dari tas katun.",
        },
      ],
    },
  },
};

export default item;
