import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah hambatan akses dikurangi, usulan dari dusun yang sebelumnya tidak terwakili mulai muncul dalam hasil musyawarah.",
        },
        {
          isCorrect: false,
          label:
            "Undangan yang direvisi membuat waktu dan lokasi musyawarah lebih mudah ditemukan tanpa mengubah jalur partisipasi yang tersedia.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: true,
          label:
            "Catatan perjalanan terverifikasi menunjukkan warga yang pulang lebih awal memiliki angkutan pulang yang setara setelah sesi keputusan, tetapi memilih pergi karena alasan pribadi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
