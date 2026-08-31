import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mengulang sudut 45 derajat saja pada hari paling cerah agar suhu maksimumnya dapat dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Menguji sudut di sekitar 45 derajat dengan interval lebih rapat, mengacak atau memutar posisi oven, dan mengulangnya pada berbagai kondisi iradiansi sambil mencatat angin serta awan.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah volume air dan warna wadah pada setiap sudut supaya rancangan menyerupai penggunaan rumah tangga.",
        },
        {
          isCorrect: false,
          label:
            "Menempatkan oven 45 derajat di lokasi tanpa bayangan dan oven lain di lokasi yang tersedia agar hasil terbaik lebih mudah dibedakan.",
        },
        {
          isCorrect: false,
          label:
            "Membandingkan suhu akhir dari hari yang berbeda tanpa mencatat iradiansi karena semua percobaan berlangsung selama 40 menit.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
