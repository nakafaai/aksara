import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nara belum dapat menentukan warga yang paling dapat dipercaya, sehingga semua catatan harus ditampilkan tanpa penjelasan.",
        },
        {
          isCorrect: false,
          label:
            "Nara ingin memenuhi permintaan kepala kantor dengan membuat peta yang lebih bersih dan sederhana.",
        },
        {
          isCorrect: false,
          label:
            "Kedua warga sebenarnya mengamati lampu yang berbeda, meskipun cerita menyebut lokasi yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan catatan membuktikan bahwa lampu rusak tepat di antara pukul 19.00 dan 22.00.",
        },
        {
          isCorrect: true,
          label:
            "Kedua catatan berasal dari waktu yang berbeda dan sama-sama dapat memuat pengalaman yang benar; legenda menjaga konteks itu agar kondisi lampu tidak dianggap tetap.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
