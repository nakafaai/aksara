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
          isCorrect: true,
          label:
            "Ketepatan angka tidak menjamin ketepatan cerita jika kategori peristiwanya tidak dijelaskan.",
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
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
