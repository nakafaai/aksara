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
            "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan.",
        },
        {
          correct: false,
          label:
            "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah.",
        },
        {
          correct: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          correct: true,
          label:
            "Pilihan batas periode yang wajar dapat berbeda menurut pertanyaan sejarah yang diajukan.",
        },
        {
          correct: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
      ],
    },
  },
};

export default item;
