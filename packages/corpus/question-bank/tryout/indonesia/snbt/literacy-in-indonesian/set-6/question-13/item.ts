import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan dari $$16$$ menjadi $$27$$ membuktikan bahwa kartu tujuan menaikkan nilai semester setiap peserta.",
        },
        {
          correct: false,
          label:
            "Karena peserta ikut memberi masukan, kondisi pembanding $$17$$ tidak lagi diperlukan untuk menilai program.",
        },
        {
          correct: false,
          label:
            "Jangka uji dua minggu hanya membatasi ketelitian angka dan tidak membatasi jenis hasil belajar yang dapat disimpulkan.",
        },
        {
          correct: true,
          label:
            "Selisih $$27$$ dibandingkan $$17$$ mendukung uji lanjutan kartu tujuan dengan kolom revisi, tetapi hasil dua minggu tentang catatan pertemuan belum membuktikan kenaikan nilai semester.",
        },
        {
          correct: false,
          label:
            "Program sebaiknya langsung diterapkan penuh karena mata pelajaran, jadwal, dan kehadiran awal telah dibuat sebanding.",
        },
      ],
    },
  },
};

export default item;
