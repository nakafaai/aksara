import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Contoh Foto Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pendataan Pohon",
        },
        {
          isCorrect: true,
          label: "Pengujian Contoh Foto dalam Pendataan Kondisi Pohon Jalan",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Pencatat terhadap Perancangan Ulang Permanen Pendataan",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pendataan Pohon",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
