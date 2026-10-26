import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dokumen berbeda mengaitkan 1912 dengan konstruksi, 1914 dengan penggunaan, dan 1916 dengan peresmian.",
        },
        {
          correct: false,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
        {
          correct: false,
          label:
            "Pemerintah kota dapat memilih tanggal yang paling tua agar monumen tampak lebih bersejarah.",
        },
        {
          correct: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          correct: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
