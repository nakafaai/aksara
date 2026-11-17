import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The copper plate stops first, because its lower resistivity gives the largest induced currents, and the thin aluminium plate stops after the thick one",
        },
        {
          correct: true,
          label:
            "The two solid aluminium plates stop equally quickly and before the copper plate, and the slotted plate swings longest",
        },
        {
          correct: false,
          label:
            "The copper plate stops first, the two solid aluminium plates stop equally quickly, and the slotted plate swings longest",
        },
        {
          correct: false,
          label:
            "The thin aluminium plate stops first because it is lightest, the copper plate stops last, and the slotted plate is not slowed at all",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Plat kuprum berhenti dahulu, kerana kerintangannya yang lebih rendah memberi arus aruhan terbesar, dan plat aluminium nipis berhenti selepas plat yang tebal",
        },
        {
          correct: true,
          label:
            "Dua plat aluminium padu berhenti sama cepat dan sebelum plat kuprum, dan plat berlurah berayun paling lama",
        },
        {
          correct: false,
          label:
            "Plat kuprum berhenti dahulu, dua plat aluminium padu berhenti sama cepat, dan plat berlurah berayun paling lama",
        },
        {
          correct: false,
          label:
            "Plat aluminium nipis berhenti dahulu kerana paling ringan, plat kuprum berhenti terakhir, dan plat berlurah langsung tidak diperlahankan",
        },
      ],
    },
  },
};

export default item;
