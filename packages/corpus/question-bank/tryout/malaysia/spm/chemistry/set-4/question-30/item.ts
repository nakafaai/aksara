import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "9.2 g of ethanol, because all the glucose ferments",
        },
        {
          correct: true,
          label: "7.36 g of ethanol, and the fermentation went 80% of the way",
        },
        {
          correct: false,
          label: "3.68 g of ethanol, and the fermentation went 40% of the way",
        },
        {
          correct: false,
          label:
            "14.7 g of ethanol, because each carbon dioxide molecule pairs with two ethanol molecules",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "9.2 g etanol, kerana semua glukosa ditapai" },
        {
          correct: true,
          label:
            "7.36 g etanol, dan penapaian berlaku 80% daripada jumlah penuh",
        },
        {
          correct: false,
          label:
            "3.68 g etanol, dan penapaian berlaku 40% daripada jumlah penuh",
        },
        {
          correct: false,
          label:
            "14.7 g etanol, kerana setiap molekul karbon dioksida berpasangan dengan dua molekul etanol",
        },
      ],
    },
  },
};

export default item;
