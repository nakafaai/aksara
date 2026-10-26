import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menggabungkan semua peserta menjadi satu angka agar peningkatan peta baru terlihat lebih stabil.",
        },
        {
          correct: false,
          label:
            "Mempertahankan ikon yang ada dan hanya menambah jumlah petugas untuk menjelaskan arti setiap simbol.",
        },
        {
          correct: false,
          label:
            "Mengukur kecepatan menemukan alat tanpa memeriksa apakah anak dapat atau ingin menggunakan alat tersebut.",
        },
        {
          correct: true,
          label:
            "Merancang ikon bersama kelompok yang belum terwakili, lalu mengukur keberhasilan menemukan alat dan pengalaman menggunakannya sebagai dua hasil terpisah.",
        },
        {
          correct: false,
          label:
            "Menguji peta hanya pada kelompok mobilitas karena kelompok itu menunjukkan kenaikan paling besar.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
