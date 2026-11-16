import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "Magnesium gives −525 kJ mol⁻¹, releasing more heat than iron, because magnesium sits farther above copper in the electrochemical series" },
        { correct: false, label: "Magnesium gives −147 kJ mol⁻¹, the same as iron, because both displace the same amount of copper" },
        { correct: false, label: "Magnesium gives −52.5 kJ mol⁻¹, because the mixture has a mass of 25 g" },
        { correct: false, label: "Iron gives the larger value, because iron atoms are heavier than magnesium atoms" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Magnesium memberikan −525 kJ mol⁻¹, membebaskan lebih banyak haba daripada ferum, kerana magnesium berada lebih jauh di atas kuprum dalam siri elektrokimia" },
        { correct: false, label: "Magnesium memberikan −147 kJ mol⁻¹, sama dengan ferum, kerana kedua-duanya menyesarkan jumlah kuprum yang sama" },
        { correct: false, label: "Magnesium memberikan −52.5 kJ mol⁻¹, kerana campuran berjisim 25 g" },
        { correct: false, label: "Ferum memberikan nilai yang lebih besar, kerana atom ferum lebih berat daripada atom magnesium" },
      ],
    },
  },
};

export default item;
