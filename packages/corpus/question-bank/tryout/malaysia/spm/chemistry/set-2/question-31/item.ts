import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hex-1-ene forms more water, because its double bond holds extra hydrogen",
        },
        {
          correct: false,
          label:
            "Both form the same mass of carbon dioxide, because each molecule has six carbon atoms",
        },
        {
          correct: true,
          label:
            "Hex-1-ene forms $$3.14\\text{ g}$$ of carbon dioxide and hexane $$3.07\\text{ g}$$, because hex-1-ene has a higher percentage of carbon by mass",
        },
        {
          correct: false,
          label:
            "Hexane forms more carbon dioxide, because each hexane molecule has more atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Heks-1-ena membentuk lebih banyak air, kerana ikatan ganda duanya memegang hidrogen tambahan",
        },
        {
          correct: false,
          label:
            "Kedua-duanya membentuk jisim karbon dioksida yang sama, kerana setiap molekul mempunyai enam atom karbon",
        },
        {
          correct: true,
          label:
            "Heks-1-ena membentuk $$3.14\\text{ g}$$ karbon dioksida dan heksana $$3.07\\text{ g}$$, kerana heks-1-ena mempunyai peratus karbon mengikut jisim yang lebih tinggi",
        },
        {
          correct: false,
          label:
            "Heksana membentuk lebih banyak karbon dioksida, kerana setiap molekul heksana mempunyai lebih banyak atom",
        },
      ],
    },
  },
};

export default item;
