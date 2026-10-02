import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: false,
          label:
            "Periodisasi memilih tanggal paling awal, sedangkan kronologi mengabaikan urutan peristiwa setelah tanggal itu.",
        },
        {
          isCorrect: true,
          label:
            "Periodisasi memilih batas penjelas sesuai tujuan analisis, sedangkan kronologi menempatkan peristiwa dalam urutan waktu.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
