import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "electric-bus",
  versions: {
    id: {
      columns: [
        "Kelebihan bus listrik",
        "Kekurangan bus listrik",
        "Rencana pemerintah kota",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Harga satu bus hampir dua kali lipat harga bus solar.",
        },
        {
          column: 3,
          label: "Dua titik pengisian cepat akan dibangun di kawasan industri.",
        },
        { column: 1, label: "Biaya energinya sekitar Rp1.200 per kilometer." },
        {
          column: 2,
          label: "Jarak tempuh berkurang ketika pendingin udara terus menyala.",
        },
      ],
    },
  },
};

export default item;
