import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Catatan Awal Sebelum Contoh Foto Diuji",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pendataan Pohon",
        },
        {
          correct: true,
          label: "Pengujian Contoh Foto dalam Pendataan Kondisi Pohon Jalan",
        },
        {
          correct: false,
          label:
            "Tanggapan Pencatat terhadap Perancangan Ulang Permanen Pendataan",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pendataan Pohon",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
