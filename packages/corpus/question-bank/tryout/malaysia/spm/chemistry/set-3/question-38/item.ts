import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "About 14 isoprene units for every cross-link, and the rubber is more elastic because its chains are linked" },
        { correct: false, label: "About 30 isoprene units for every cross-link, and the rubber is more elastic because its chains are linked" },
        { correct: true, label: "About 28 isoprene units for every cross-link, and the cross-links pull the chains back after stretching, so the rubber is more elastic and harder" },
        { correct: false, label: "About 28 isoprene units for every cross-link, and the rubber is softer because sulfur breaks the polymer chains" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Kira-kira 14 unit isoprena bagi setiap rangkai silang, dan getah itu lebih kenyal kerana rantainya terangkai" },
        { correct: false, label: "Kira-kira 30 unit isoprena bagi setiap rangkai silang, dan getah itu lebih kenyal kerana rantainya terangkai" },
        { correct: true, label: "Kira-kira 28 unit isoprena bagi setiap rangkai silang, dan rangkai silang menarik rantai kembali selepas diregangkan, jadi getah itu lebih kenyal dan lebih keras" },
        { correct: false, label: "Kira-kira 28 unit isoprena bagi setiap rangkai silang, dan getah itu lebih lembut kerana sulfur memutuskan rantai polimer" },
      ],
    },
  },
};

export default item;
