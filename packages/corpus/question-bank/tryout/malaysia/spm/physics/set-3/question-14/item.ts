import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The wavelength falls from $$180\\text{ km}$$ to $$9.0\\text{ km}$$, the frequency does not change, and the crossing takes about $$2.9\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "The wavelength stays $$180\\text{ km}$$, the frequency rises $$20$$ times, and the crossing takes about $$2.9\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "The wavelength falls from $$180\\text{ km}$$ to $$0.45\\text{ km}$$, the frequency does not change, and the crossing takes about $$2.9\\text{ h}$$",
        },
        {
          correct: false,
          label:
            "The wavelength falls from $$180\\text{ km}$$ to $$9.0\\text{ km}$$, the frequency does not change, and the crossing takes about $$2.5\\text{ h}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Panjang gelombang turun daripada $$180\\text{ km}$$ kepada $$9.0\\text{ km}$$, frekuensi tidak berubah, dan perjalanan mengambil masa kira-kira $$2.9\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "Panjang gelombang kekal $$180\\text{ km}$$, frekuensi naik $$20$$ kali, dan perjalanan mengambil masa kira-kira $$2.9\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "Panjang gelombang turun daripada $$180\\text{ km}$$ kepada $$0.45\\text{ km}$$, frekuensi tidak berubah, dan perjalanan mengambil masa kira-kira $$2.9\\text{ j}$$",
        },
        {
          correct: false,
          label:
            "Panjang gelombang turun daripada $$180\\text{ km}$$ kepada $$9.0\\text{ km}$$, frekuensi tidak berubah, dan perjalanan mengambil masa kira-kira $$2.5\\text{ j}$$",
        },
      ],
    },
  },
};

export default item;
