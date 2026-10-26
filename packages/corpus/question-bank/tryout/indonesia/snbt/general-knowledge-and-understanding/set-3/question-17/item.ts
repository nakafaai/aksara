import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada uji kedua, peserta baru memilih rute dan waktu berangkat dengan lebih tepat.",
        },
        {
          correct: false,
          label:
            "Pesan darurat perlu mempertahankan makna dan tindakan melalui bahasa yang dipahami warga, bukan sekadar menyalin urutan kata resmi.",
        },
        {
          correct: false,
          label:
            "Sebagian penyiar menganggap terjemahan paling aman adalah terjemahan yang mengikuti urutan kata sumber.",
        },
        {
          correct: false,
          label:
            "Setiap versi akan diuji lagi bersama warga sebelum digunakan.",
        },
        {
          correct: false,
          label:
            "Satu terjemahan yang lulus uji kedua pasti dapat digunakan tanpa perubahan di seluruh daerah.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
