import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "<InlineMath math=\"\\text{YZ}_2\" />, covalent, relative formula mass 52" },
        { correct: false, label: "<InlineMath math=\"\\text{Y}_2\\text{Z}_3\" />, ionic, relative formula mass 90" },
        { correct: true, label: "<InlineMath math=\"\\text{Y}_3\\text{Z}_2\" />, ionic, relative formula mass 100" },
        { correct: false, label: "<InlineMath math=\"\\text{Y}_3\\text{Z}_2\" />, covalent, relative formula mass 100" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "<InlineMath math=\"\\text{YZ}_2\" />, kovalen, jisim formula relatif 52" },
        { correct: false, label: "<InlineMath math=\"\\text{Y}_2\\text{Z}_3\" />, ion, jisim formula relatif 90" },
        { correct: true, label: "<InlineMath math=\"\\text{Y}_3\\text{Z}_2\" />, ion, jisim formula relatif 100" },
        { correct: false, label: "<InlineMath math=\"\\text{Y}_3\\text{Z}_2\" />, kovalen, jisim formula relatif 100" },
      ],
    },
  },
};

export default item;
