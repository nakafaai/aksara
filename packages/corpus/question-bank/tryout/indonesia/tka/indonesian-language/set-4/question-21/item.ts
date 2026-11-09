import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "honesty-canteen",
  versions: {
    id: {
      columns: [
        "Latar masalah",
        "Perubahan yang dilakukan",
        "Rencana berikutnya",
      ],
      kind: "matrix",
      statements: [
        { column: 2, label: "Pembayaran dengan kode QR disediakan." },
        {
          column: 1,
          label: "Selisih pada kantin pertama pernah lebih dari sepertiga.",
        },
        {
          column: 3,
          label: "Stok akan dicatat dua kali sehari mulai Oktober.",
        },
        { column: 2, label: "Harga dibulatkan ke kelipatan seribu rupiah." },
      ],
    },
  },
};

export default item;
