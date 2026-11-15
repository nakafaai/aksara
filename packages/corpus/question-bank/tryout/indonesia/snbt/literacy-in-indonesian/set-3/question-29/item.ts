import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Angka yang diketahui acak tetap dapat menggeser perkiraan orang.",
        },
        {
          correct: false,
          label:
            "Efek jangkar hanya terjadi pada orang yang tidak tahu harga pasar suatu barang.",
        },
        {
          correct: true,
          label:
            "Percobaan roda angka tidak dapat menunjukkan penjelasan mana yang benar tentang efek jangkar.",
        },
        {
          correct: false,
          label:
            "Dalam tawar-menawar, pihak yang lebih dulu menyebut angka tinggi pasti mendapat harga akhir yang lebih tinggi.",
        },
        {
          correct: true,
          label:
            "Pada pedagang madu, efek angka yang disebut lebih lemah daripada pada siswa, tetapi tetap ada.",
        },
      ],
    },
  },
};

export default item;
