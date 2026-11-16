import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "16.2 g of glucose, because mass is conserved",
        },
        {
          correct: true,
          label:
            "18.0 g of glucose, because each glucose unit takes up one water molecule as it is released",
        },
        {
          correct: false,
          label:
            "32.4 g of glucose, because each unit splits into two glucose molecules",
        },
        {
          correct: false,
          label: "9.0 g of glucose, because half the starch stays unhydrolysed",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "16.2 g glukosa, kerana jisim terabadi" },
        {
          correct: true,
          label:
            "18.0 g glukosa, kerana setiap unit glukosa mengambil satu molekul air semasa dibebaskan",
        },
        {
          correct: false,
          label:
            "32.4 g glukosa, kerana setiap unit terpecah kepada dua molekul glukosa",
        },
        {
          correct: false,
          label: "9.0 g glukosa, kerana separuh kanji tidak terhidrolisis",
        },
      ],
    },
  },
};

export default item;
