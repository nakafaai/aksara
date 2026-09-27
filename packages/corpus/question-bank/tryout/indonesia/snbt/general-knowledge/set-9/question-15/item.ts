import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: true,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
        {
          isCorrect: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
        {
          isCorrect: false,
          label:
            "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
