import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The maximum kinetic energy of the photoelectrons for $$400\\text{ nm}$$ light is about $$0.8\\text{ eV}$$, and $$600\\text{ nm}$$ light emits no electrons even if its intensity is doubled",
        },
        {
          correct: false,
          label:
            "The maximum kinetic energy of the photoelectrons for $$400\\text{ nm}$$ light is about $$0.8\\text{ eV}$$, and $$600\\text{ nm}$$ light emits electrons with a smaller maximum kinetic energy",
        },
        {
          correct: false,
          label:
            "The maximum kinetic energy of the photoelectrons for $$400\\text{ nm}$$ light is about $$3.1\\text{ eV}$$, and $$600\\text{ nm}$$ light emits no electrons",
        },
        {
          correct: false,
          label:
            "The maximum kinetic energy of the photoelectrons for $$400\\text{ nm}$$ light is about $$0.8\\text{ eV}$$, and doubling the intensity of the $$400\\text{ nm}$$ light doubles that maximum kinetic energy",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tenaga kinetik maksimum fotoelektron bagi cahaya $$400\\text{ nm}$$ ialah kira-kira $$0.8\\text{ eV}$$, dan cahaya $$600\\text{ nm}$$ tidak memancarkan elektron walaupun keamatannya digandakan",
        },
        {
          correct: false,
          label:
            "Tenaga kinetik maksimum fotoelektron bagi cahaya $$400\\text{ nm}$$ ialah kira-kira $$0.8\\text{ eV}$$, dan cahaya $$600\\text{ nm}$$ memancarkan elektron dengan tenaga kinetik maksimum yang lebih kecil",
        },
        {
          correct: false,
          label:
            "Tenaga kinetik maksimum fotoelektron bagi cahaya $$400\\text{ nm}$$ ialah kira-kira $$3.1\\text{ eV}$$, dan cahaya $$600\\text{ nm}$$ tidak memancarkan elektron",
        },
        {
          correct: false,
          label:
            "Tenaga kinetik maksimum fotoelektron bagi cahaya $$400\\text{ nm}$$ ialah kira-kira $$0.8\\text{ eV}$$, dan menggandakan keamatan cahaya $$400\\text{ nm}$$ menggandakan tenaga kinetik maksimum itu",
        },
      ],
    },
  },
};

export default item;
