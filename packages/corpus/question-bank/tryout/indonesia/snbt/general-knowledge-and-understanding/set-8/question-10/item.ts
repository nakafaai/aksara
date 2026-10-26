import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sesudah sumber nama ditampilkan, keluarga dan perajin dapat menunjukkan label yang salah tanpa mengurangi keberhasilan pencarian.",
        },
        {
          correct: true,
          label:
            "Penelitian arsip membuktikan bahwa semua nama lokal muncul setelah label kurator dan sengaja menyalinnya.",
        },
        {
          correct: false,
          label:
            "Pemindai baru membuat label yang pudar lebih mudah dibaca, tetapi tidak mengubah asal maupun urutan waktu kemunculan nama.",
        },
        {
          correct: false,
          label: "Hasil pencarian akan menampilkan sumber setiap nama.",
        },
        {
          correct: false,
          label: "Salah satu nama dalam buku lama dibuat oleh kurator.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
