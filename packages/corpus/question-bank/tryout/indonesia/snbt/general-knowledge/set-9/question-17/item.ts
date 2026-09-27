import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dokumen berbeda mengaitkan 1912 dengan konstruksi, 1914 dengan penggunaan, dan 1916 dengan peresmian.",
        },
        {
          isCorrect: false,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah kota dapat memilih tanggal yang paling tua agar monumen tampak lebih bersejarah.",
        },
        {
          isCorrect: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
