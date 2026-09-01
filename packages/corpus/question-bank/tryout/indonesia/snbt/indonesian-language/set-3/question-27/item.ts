import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
        {
          isCorrect: true,
          label:
            "Tindakan Mira membuat lampu beralih dari penanda panggung kosong menjadi undangan membaca, lalu permintaan sopir dan kedatangan penjual menguatkan perubahan itu.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
