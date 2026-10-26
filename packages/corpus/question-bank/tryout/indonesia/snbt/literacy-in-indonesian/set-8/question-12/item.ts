import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hasil $$27$$ dari $$30$$ menunjukkan bahwa tiga pasangan yang tersisa pasti salah karena petugas tidak memahami satuan meter.",
        },
        {
          correct: true,
          label:
            "Hasil $$27$$ dari $$30$$ menunjukkan formulir baru mengurangi kebutuhan menebak satuan dan titik acuan, tetapi pengukuran dari musim atau waktu berbeda tetap belum otomatis setara.",
        },
        {
          correct: false,
          label:
            "Perbedaan $$27$$ dan $$14$$ membuktikan bahwa formulir menjadi satu-satunya penjelasan atas setiap pasangan yang dapat dibandingkan.",
        },
        {
          correct: false,
          label:
            "Tiga puluh pasangan sudah cukup untuk memastikan formulir akan memberi hasil yang sama di setiap desa dan musim.",
        },
        {
          correct: false,
          label:
            "Selama nilai asli disimpan, semua catatan lama dapat dibandingkan tanpa mengetahui satuan dan titik acuannya.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
