import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Percobaan membuktikan bahwa konduksi merupakan satu-satunya mekanisme yang menurunkan suhu air di kedua wadah.",
        },
        {
          isCorrect: true,
          label:
            "Air dalam aluminium mendingin lebih cepat daripada dalam polipropilena, tetapi perbedaan bahan belum terpisah dari ketebalan dinding dan mekanisme perpindahan panas lain.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan suhu akhir membuktikan bahwa aluminium selalu menjadi wadah yang lebih buruk untuk setiap penggunaan.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan volume dan suhu awal sudah cukup mengisolasi bahan sebagai penyebab tunggal perbedaan laju pendinginan.",
        },
        {
          isCorrect: false,
          label:
            "Karena wadah berbeda ketebalan, tabel suhu tidak dapat digunakan untuk menyusun hipotesis apa pun tentang perpindahan panas.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
