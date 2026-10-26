import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah hambatan akses dikurangi, usulan dari dusun yang sebelumnya tidak terwakili mulai muncul dalam hasil musyawarah.",
        },
        {
          correct: false,
          label:
            "Undangan yang direvisi membuat waktu dan lokasi musyawarah lebih mudah ditemukan tanpa mengubah jalur partisipasi yang tersedia.",
        },
        {
          correct: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          correct: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          correct: true,
          label:
            "Catatan perjalanan terverifikasi menunjukkan warga yang pulang lebih awal memiliki angkutan pulang yang setara setelah sesi keputusan, tetapi memilih pergi karena alasan pribadi.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
