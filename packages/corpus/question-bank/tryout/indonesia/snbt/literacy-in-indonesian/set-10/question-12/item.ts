import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua kelompok memperoleh peningkatan yang sebanding karena penyebut pada setiap baris tidak berubah.",
        },
        {
          correct: false,
          label:
            "Kelompok tanpa kebutuhan akses menunjukkan peningkatan terbesar karena $$19$$ dari $$20$$ merupakan hasil tertinggi.",
        },
        {
          correct: false,
          label:
            "Hasil kelompok sensorik turun karena $$13$$ dari $$20$$ lebih kecil daripada $$16$$ dari $$20$$ pada kelompok mobilitas.",
        },
        {
          correct: true,
          label:
            "Manfaat tampak paling besar pada kelompok mobilitas dan kebutuhan majemuk, sedangkan perubahan kecil pada kelompok sensorik menunjukkan ikon masih perlu diperbaiki.",
        },
        {
          correct: false,
          label:
            "Perbedaan antarkelompok tidak dapat dibandingkan karena setiap kebutuhan pasti memiliki definisi keberhasilan yang berbeda dalam tabel.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
