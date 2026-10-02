import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menggabungkan semua peserta menjadi satu angka agar peningkatan peta baru terlihat lebih stabil.",
        },
        {
          isCorrect: false,
          label:
            "Mempertahankan ikon yang ada dan hanya menambah jumlah petugas untuk menjelaskan arti setiap simbol.",
        },
        {
          isCorrect: false,
          label:
            "Mengukur kecepatan menemukan alat tanpa memeriksa apakah anak dapat atau ingin menggunakan alat tersebut.",
        },
        {
          isCorrect: true,
          label:
            "Merancang ikon bersama kelompok yang belum terwakili, lalu mengukur keberhasilan menemukan alat dan pengalaman menggunakannya sebagai dua hasil terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Menguji peta hanya pada kelompok mobilitas karena kelompok itu menunjukkan kenaikan paling besar.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
