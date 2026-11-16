import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "It holds chloroplasts, because it makes polypeptides from amino acids" },
        { correct: false, label: "It holds ribosomes, because it makes polypeptides and settles after fraction 2" },
        { correct: false, label: "It holds no mitochondria, because it takes up no oxygen when given glucose" },
        { correct: true, label: "It holds mitochondria, which can use pyruvate but not glucose" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pecahan itu mengandungi kloroplas, kerana ia menghasilkan polipeptida daripada asid amino" },
        { correct: false, label: "Pecahan itu mengandungi ribosom, kerana ia menghasilkan polipeptida dan termendap selepas pecahan 2" },
        { correct: false, label: "Pecahan itu tidak mengandungi mitokondria, kerana ia tidak mengambil oksigen apabila diberi glukosa" },
        { correct: true, label: "Pecahan itu mengandungi mitokondria, yang boleh menggunakan piruvat tetapi bukan glukosa" },
      ],
    },
  },
};

export default item;
