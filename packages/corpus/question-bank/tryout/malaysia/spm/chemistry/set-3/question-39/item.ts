import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Detergent anions form scum with calcium ions, so detergent works less well in hard water" },
        { correct: true, label: "Soap anions form an insoluble scum with calcium and magnesium ions while detergent anions do not, so detergent cleans better in hard water" },
        { correct: false, label: "Soap works better in hard water, because its hydrocarbon tail dissolves in water" },
        { correct: false, label: "Both clean equally well in hard water, because both have an ionic head that dissolves in water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Anion detergen membentuk kekat dengan ion kalsium, jadi detergen kurang berkesan dalam air liat" },
        { correct: true, label: "Anion sabun membentuk kekat tidak larut dengan ion kalsium dan magnesium manakala anion detergen tidak, jadi detergen membersih lebih baik dalam air liat" },
        { correct: false, label: "Sabun lebih berkesan dalam air liat, kerana ekor hidrokarbonnya larut dalam air" },
        { correct: false, label: "Kedua-duanya membersih sama baik dalam air liat, kerana kedua-duanya mempunyai kepala ion yang larut dalam air" },
      ],
    },
  },
};

export default item;
