import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "adaptations-of-plants-in-different-habitats",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Respiration through the night releases carbon dioxide, which dissolves in the cell sap" },
        { correct: true, label: "Carbon dioxide taken in through stomata open at night is stored as an acid until light is available" },
        { correct: false, label: "Photosynthesis in the morning light makes an acid as its first product" },
        { correct: false, label: "The stomata close at night and trap the carbon dioxide made by respiration" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Respirasi sepanjang malam membebaskan karbon dioksida yang larut dalam sap sel" },
        { correct: true, label: "Karbon dioksida yang diambil melalui stoma yang terbuka pada waktu malam disimpan sebagai asid sehingga cahaya tersedia" },
        { correct: false, label: "Fotosintesis dalam cahaya pagi menghasilkan asid sebagai hasil pertamanya" },
        { correct: false, label: "Stoma tertutup pada waktu malam dan memerangkap karbon dioksida yang dihasilkan oleh respirasi" },
      ],
    },
  },
};

export default item;
