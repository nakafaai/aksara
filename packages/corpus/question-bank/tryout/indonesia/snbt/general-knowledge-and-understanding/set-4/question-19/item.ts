import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pemetaan yang tertib dapat memakai satu indeks resmi sambil mempertahankan nama lain beserta bukti dan konteksnya.",
        },
        {
          correct: false,
          label:
            "Nama resmi yang lebih pendek dianggap sebagian pemeta lebih mudah dicetak dan dicari.",
        },
        {
          correct: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          correct: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          correct: true,
          label:
            "Papan, surat tanah, wawancara, dan koordinat menunjukkan bahwa ketiga nama merujuk pada lokasi yang sama.",
        },
      ],
    },
  },
};

export default item;
