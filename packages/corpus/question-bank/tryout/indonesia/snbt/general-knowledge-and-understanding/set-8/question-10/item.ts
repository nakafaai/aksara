import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sesudah sumber nama ditampilkan, keluarga dan perajin dapat menunjukkan label yang salah tanpa mengurangi keberhasilan pencarian.",
        },
        {
          isCorrect: true,
          label:
            "Penelitian arsip membuktikan bahwa semua nama lokal muncul setelah label kurator dan sengaja menyalinnya.",
        },
        {
          isCorrect: false,
          label:
            "Pemindai baru membuat label yang pudar lebih mudah dibaca, tetapi tidak mengubah asal maupun urutan waktu kemunculan nama.",
        },
        {
          isCorrect: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          isCorrect: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
