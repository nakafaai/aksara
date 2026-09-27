import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengujian Pemesanan Menu Sehari Sebelumnya dalam Program Sarapan Sekolah",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Program Sarapan",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pemesanan Sehari Sebelumnya Diuji",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Siswa terhadap Perancangan Ulang Permanen Program Sarapan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Program Sarapan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
