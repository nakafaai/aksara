import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "grandma-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Buku resep itu bersampul kain batik." },
        { correct: true, label: "Takaran tepung ditulis “secukupnya”." },
        { correct: false, label: "Ibu memakan satu nastar lalu tersenyum." },
        { correct: true, label: "Resep itu tidak mencantumkan suhu oven." },
      ],
    },
  },
};

export default item;
