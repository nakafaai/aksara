import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Bantahan penulis menjadi lebih kuat, karena laboratorium itu terbukti didatangi peneliti dari banyak negara di dunia." },
        { correct: false, label: "Bantahan penulis tidak terpengaruh, karena sebutan itu hanya menyangkut kebun, bukan laboratoriumnya." },
        { correct: true, label: "Bantahan penulis melemah, tetapi tidak gugur, karena kebun itu masih punya herbarium dan kini berfungsi untuk konservasi." },
        { correct: false, label: "Bantahan penulis gugur seluruhnya, sehingga sebutan itu berlaku untuk seluruh sejarah kebun itu sampai sekarang." },
        { correct: false, label: "Bantahan penulis melemah, karena kelapa sawit ternyata tidak pernah ditanam di kebun itu." },
      ],
    },
  },
};

export default item;
