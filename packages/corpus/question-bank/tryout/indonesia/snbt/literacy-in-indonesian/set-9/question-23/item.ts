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
            "Bait empat baris yang berima a-b-a-b tetapi keempat barisnya berisi pesan tidak memenuhi semua ciri pantun yang dijelaskan teks.",
        },
        {
          column: 2,
          label:
            "Menurut teks, pantun berasal dari Indonesia lalu menyebar ke Malaysia.",
        },
        {
          column: 1,
          label:
            "Menurut penulis, pendengar dapat menebak bunyi akhir baris isi sebelum baris itu diucapkan.",
        },
        {
          column: 2,
          label:
            "Menurut penulis, gema antara sampiran dan isi selalu ada walaupun longgar.",
        },
        {
          column: 1,
          label:
            "Penulis berpendapat bahwa pantun bertahan selama masih ada orang yang membalasnya.",
        },
      ],
    },
  },
};

export default item;
