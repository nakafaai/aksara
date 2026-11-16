import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "adaptations-of-plants-in-different-habitats",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Pneumatophores: salty water. Salt glands: little oxygen in the mud. Viviparous seedlings: tides." },
        { correct: false, label: "Pneumatophores: tides. Salt glands: salty water. Viviparous seedlings: little oxygen in the mud." },
        { correct: true, label: "Pneumatophores: little oxygen in the mud. Salt glands: salty water. Viviparous seedlings: tides." },
        { correct: false, label: "Pneumatophores: little oxygen in the mud. Salt glands: tides. Viviparous seedlings: salty water." },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pneumatofor: air masin. Kelenjar garam: lumpur kurang oksigen. Anak benih vivipari: air pasang surut." },
        { correct: false, label: "Pneumatofor: air pasang surut. Kelenjar garam: air masin. Anak benih vivipari: lumpur kurang oksigen." },
        { correct: true, label: "Pneumatofor: lumpur kurang oksigen. Kelenjar garam: air masin. Anak benih vivipari: air pasang surut." },
        { correct: false, label: "Pneumatofor: lumpur kurang oksigen. Kelenjar garam: air pasang surut. Anak benih vivipari: air masin." },
      ],
    },
  },
};

export default item;
