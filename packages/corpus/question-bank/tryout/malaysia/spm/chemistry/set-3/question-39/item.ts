import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "3.06 g of soap, which lathers well in hard water" },
        { correct: true, label: "9.18 g of soap, whose anions form an insoluble scum with calcium and magnesium ions in hard water" },
        { correct: false, label: "9.18 g of soap, which lathers better than a detergent in hard water" },
        { correct: false, label: "27.5 g of soap, whose anions form an insoluble scum with calcium and magnesium ions in hard water" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "3.06 g sabun, yang berbuih dengan baik dalam air liat" },
        { correct: true, label: "9.18 g sabun, yang anionnya membentuk kekat tidak larut dengan ion kalsium dan magnesium dalam air liat" },
        { correct: false, label: "9.18 g sabun, yang berbuih lebih baik daripada detergen dalam air liat" },
        { correct: false, label: "27.5 g sabun, yang anionnya membentuk kekat tidak larut dengan ion kalsium dan magnesium dalam air liat" },
      ],
    },
  },
};

export default item;
