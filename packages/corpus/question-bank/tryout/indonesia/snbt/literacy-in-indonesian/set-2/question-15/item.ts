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
        { correct: false, label: "Penelitian itu sudah cukup untuk usaha mikro, karena usaha mikro juga dapat menaikkan harga roti kapan saja." },
        { correct: false, label: "Penelitian itu mungkin benar untuk usaha mikro, tetapi tidak berlaku bagi perusahaan besar yang tercatat resmi." },
        { correct: false, label: "Penelitian itu tidak relevan, karena pekerja di Sukaraja tidak membelanjakan upahnya di kabupaten sendiri, melainkan di kota lain." },
        { correct: true, label: "Penelitian itu mungkin benar untuk perusahaan besar, tetapi belum menjawab nasib usaha mikro yang labanya tipis." },
      ],
    },
  },
};

export default item;
