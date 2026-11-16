import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$ seconds, because blood moves slowest where the total cross-sectional area is largest" },
        { correct: true, label: "$$5$$ seconds, because blood moves slowest where the total cross-sectional area is largest" },
        { correct: false, label: "$$5$$ seconds, because the wall of a capillary is only one cell thick" },
        { correct: false, label: "$$0.2$$ seconds, because blood moves slowest where the total cross-sectional area is largest" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$ saat, kerana darah bergerak paling perlahan di tempat jumlah luas keratan rentas paling besar" },
        { correct: true, label: "$$5$$ saat, kerana darah bergerak paling perlahan di tempat jumlah luas keratan rentas paling besar" },
        { correct: false, label: "$$5$$ saat, kerana dinding kapilari hanya setebal satu sel" },
        { correct: false, label: "$$0.2$$ saat, kerana darah bergerak paling perlahan di tempat jumlah luas keratan rentas paling besar" },
      ],
    },
  },
};

export default item;
