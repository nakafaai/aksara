import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pengujian Pemesanan Menu Sehari Sebelumnya dalam Program Sarapan Sekolah",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Program Sarapan",
        },
        {
          correct: false,
          label: "Catatan Awal Sebelum Pemesanan Sehari Sebelumnya Diuji",
        },
        {
          correct: false,
          label:
            "Tanggapan Siswa terhadap Perancangan Ulang Permanen Program Sarapan",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Program Sarapan",
        },
      ],
    },
  },
};

export default item;
