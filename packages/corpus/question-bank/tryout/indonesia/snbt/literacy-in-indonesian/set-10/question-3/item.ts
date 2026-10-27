import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Mengulang sudut $$45$$ derajat saja pada hari paling cerah agar suhu maksimumnya dapat dipastikan.",
        },
        {
          correct: true,
          label:
            "Menguji sudut di sekitar $$45$$ derajat dengan interval lebih rapat, mengacak atau memutar posisi oven, dan mengulangnya pada berbagai kondisi iradiansi sambil mencatat angin serta awan.",
        },
        {
          correct: false,
          label:
            "Mengubah volume air dan warna wadah pada setiap sudut supaya rancangan menyerupai penggunaan rumah tangga.",
        },
        {
          correct: false,
          label:
            "Menempatkan oven $$45$$ derajat di lokasi tanpa bayangan dan oven lain di lokasi yang tersedia agar hasil terbaik lebih mudah dibedakan.",
        },
        {
          correct: false,
          label:
            "Membandingkan suhu akhir dari hari yang berbeda tanpa mencatat iradiansi karena semua percobaan berlangsung selama $$40$$ menit.",
        },
      ],
    },
  },
};

export default item;
