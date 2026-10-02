import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemetaan yang tertib dapat memakai satu indeks resmi sambil mempertahankan nama lain beserta bukti dan konteksnya.",
        },
        {
          isCorrect: false,
          label:
            "Nama resmi yang lebih pendek dianggap sebagian pemeta lebih mudah dicetak dan dicari.",
        },
        {
          isCorrect: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          isCorrect: true,
          label:
            "Papan, surat tanah, wawancara, dan koordinat menunjukkan bahwa ketiga nama merujuk pada lokasi yang sama.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
