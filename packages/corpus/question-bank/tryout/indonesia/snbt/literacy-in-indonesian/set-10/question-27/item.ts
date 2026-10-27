import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nara belum dapat menentukan warga yang paling dapat dipercaya, sehingga semua catatan harus ditampilkan tanpa penjelasan.",
        },
        {
          correct: false,
          label:
            "Nara ingin memenuhi permintaan kepala kantor dengan membuat peta yang lebih bersih dan sederhana.",
        },
        {
          correct: false,
          label:
            "Kedua warga sebenarnya mengamati lampu yang berbeda, meskipun cerita menyebut lokasi yang sama.",
        },
        {
          correct: false,
          label:
            "Perbedaan catatan membuktikan bahwa lampu rusak tepat di antara pukul $$19.00$$ dan $$22.00$$.",
        },
        {
          correct: true,
          label:
            "Kedua catatan berasal dari waktu yang berbeda dan sama-sama dapat memuat pengalaman yang benar. Legenda menjaga konteks itu agar kondisi lampu tidak dianggap tetap.",
        },
      ],
    },
  },
};

export default item;
