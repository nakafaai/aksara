import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
          correct: false,
          label:
            "Periodisasi memilih tanggal paling awal, sedangkan kronologi mengabaikan urutan peristiwa setelah tanggal itu.",
        },
        {
          correct: true,
          label:
            "Periodisasi memilih batas penjelas sesuai tujuan analisis, sedangkan kronologi menempatkan peristiwa dalam urutan waktu.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
