import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "pantun-tradition",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dalam tradisi palang pintu, pantun berbalas terjadi sebelum pengantin pria dipersilakan masuk.",
        },
        {
          column: 2,
          label:
            "Menurut teks, pantun hanya dipakai untuk menyampaikan nasihat.",
        },
        {
          column: 1,
          label: "Baris pertama pantun contoh memiliki sepuluh suku kata.",
        },
        {
          column: 2,
          label: "Pantun contoh dalam teks memiliki pola rima a-a-b-b.",
        },
        {
          column: 2,
          label:
            "Baris keempat pantun contoh memiliki lebih dari dua belas suku kata.",
        },
      ],
    },
  },
};

export default item;
