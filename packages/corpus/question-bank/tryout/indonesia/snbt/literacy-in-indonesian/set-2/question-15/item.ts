import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Penelitian itu keliru, karena kenaikan upah di mana pun selalu mengurangi lapangan kerja." },
        { correct: true, label: "Penelitian itu mungkin benar untuk perusahaan besar yang tercatat resmi." },
        { correct: false, label: "Penelitian itu sudah cukup untuk menilai usaha mikro, karena usaha mikro juga dapat menaikkan harga kapan saja." },
        { correct: true, label: "Penelitian itu belum menjawab nasib usaha mikro yang labanya tipis dan tidak bisa menaikkan harga semaunya." },
        { correct: false, label: "Penelitian itu tidak relevan, karena pekerja Sukaraja membelanjakan upahnya di kota lain." },
      ],
    },
  },
};

export default item;
