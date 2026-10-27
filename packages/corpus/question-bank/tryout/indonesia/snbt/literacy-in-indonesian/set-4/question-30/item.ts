import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pengecatan Putih pada Hari Terakhir",
        },
        {
          correct: true,
          label: "Jejak Biru di Balik Dinding Putih",
        },
        {
          correct: false,
          label: "Foto Tahun $$1978$$ di Ruang Arsip",
        },
        {
          correct: false,
          label: "Mengapa Semua Lapisan Lama Harus Ditutup",
        },
        {
          correct: false,
          label: "Retakan yang Tidak Berkaitan dengan Sejarah",
        },
      ],
    },
  },
};

export default item;
