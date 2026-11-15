import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Ibu ingin Laras membawa benang emas ke Bandung, karena benang yang tidak dipakai akan rusak." },
        { correct: false, label: "Melepas Laras tidak akan memutus ikatan mereka, tetapi Laras harus segera pulang agar ikatan itu tidak rusak." },
        { correct: true, label: "Melepas Laras tidak akan memutus ikatan mereka, sedangkan menahannya justru dapat menyia-nyiakan Laras." },
        { correct: false, label: "Ibu kecewa karena Laras memilih kuliah, sebab benang emas yang terlalu lama digulung akan rusak." },
        { correct: false, label: "Menahan Laras di rumah akan menjaga ikatan mereka, sama seperti benang emas yang dijaga dengan disimpan." },
      ],
    },
  },
};

export default item;
