import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-biology",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The rate of photosynthesis is directly proportional to light intensity at every distance",
        },
        {
          correct: false,
          label:
            "Carbon dioxide is the limiting factor at every distance, because extra carbon dioxide raises the rate",
        },
        {
          correct: true,
          label:
            "Light is the limiting factor from $$40$$ to $$20\\text{ cm}$$, and carbon dioxide is the main limiting factor at $$10\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Temperature is the limiting factor at $$10\\text{ cm}$$ because the close lamp warms the water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kadar fotosintesis berkadar terus dengan keamatan cahaya pada semua jarak",
        },
        {
          correct: false,
          label:
            "Karbon dioksida ialah faktor pengehad pada semua jarak, kerana karbon dioksida tambahan menaikkan kadar",
        },
        {
          correct: true,
          label:
            "Cahaya ialah faktor pengehad dari $$40$$ ke $$20\\text{ cm}$$, dan karbon dioksida ialah faktor pengehad utama pada $$10\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "Suhu ialah faktor pengehad pada $$10\\text{ cm}$$ kerana lampu yang dekat memanaskan air",
        },
      ],
    },
  },
};

export default item;
