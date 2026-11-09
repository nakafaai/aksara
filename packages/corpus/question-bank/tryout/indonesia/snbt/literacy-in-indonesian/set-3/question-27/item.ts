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
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama. Bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          correct: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama. Akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama. Perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama. Benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
        {
          correct: true,
          label:
            "Tindakan Mira membuat lampu beralih dari penanda panggung kosong menjadi undangan membaca, lalu permintaan sopir dan kedatangan penjual menguatkan perubahan itu.",
        },
      ],
    },
  },
};

export default item;
