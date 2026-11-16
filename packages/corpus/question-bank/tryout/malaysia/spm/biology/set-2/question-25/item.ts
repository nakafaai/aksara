import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "response-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Shoot: the lower side elongates faster. Root: the lower side elongates more slowly." },
        { correct: false, label: "Shoot: the upper side elongates faster. Root: the upper side elongates more slowly." },
        { correct: false, label: "Shoot: the lower side elongates more slowly. Root: the lower side elongates faster." },
        { correct: false, label: "Shoot and root: the lower side elongates faster, because both receive more auxin there." },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Pucuk: bahagian bawah memanjang lebih cepat. Akar: bahagian bawah memanjang lebih perlahan." },
        { correct: false, label: "Pucuk: bahagian atas memanjang lebih cepat. Akar: bahagian atas memanjang lebih perlahan." },
        { correct: false, label: "Pucuk: bahagian bawah memanjang lebih perlahan. Akar: bahagian bawah memanjang lebih cepat." },
        { correct: false, label: "Pucuk dan akar: bahagian bawah memanjang lebih cepat, kerana kedua-duanya menerima lebih banyak auksin di situ." },
      ],
    },
  },
};

export default item;
