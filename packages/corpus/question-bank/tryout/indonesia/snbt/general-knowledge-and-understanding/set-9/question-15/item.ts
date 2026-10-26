import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          correct: true,
          label:
            "Tanggal sejarah harus disertai peristiwa yang dirujuk karena satu objek dapat memiliki beberapa awal dan perubahan penting.",
        },
        {
          correct: false,
          label:
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
        {
          correct: false,
          label:
            "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah.",
        },
        {
          correct: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
