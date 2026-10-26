import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Percobaan membuktikan bahwa konduksi merupakan satu-satunya mekanisme yang menurunkan suhu air di kedua wadah.",
        },
        {
          correct: true,
          label:
            "Air dalam aluminium mendingin lebih cepat daripada dalam polipropilena, tetapi perbedaan bahan belum terpisah dari ketebalan dinding dan mekanisme perpindahan panas lain.",
        },
        {
          correct: false,
          label:
            "Perbedaan suhu akhir membuktikan bahwa aluminium selalu menjadi wadah yang lebih buruk untuk setiap penggunaan.",
        },
        {
          correct: false,
          label:
            "Kesamaan volume dan suhu awal sudah cukup mengisolasi bahan sebagai penyebab tunggal perbedaan laju pendinginan.",
        },
        {
          correct: false,
          label:
            "Karena wadah berbeda ketebalan, tabel suhu tidak dapat digunakan untuk menyusun hipotesis apa pun tentang perpindahan panas.",
        },
      ],
    },
  },
};

export default item;
