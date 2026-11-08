import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "banda-nutmeg",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Orang Banda menolak menanam pala setelah harga pala di Eropa turun tajam.",
        },
        {
          correct: false,
          label:
            "Inggris meminta VOC menyerang Banda agar dapat merebut Pulau Run.",
        },
        {
          correct: false,
          label:
            "Pedagang Tionghoa berhenti membeli pala dari Kepulauan Banda sama sekali.",
        },
        {
          correct: false,
          label:
            "Pohon pala di Banda rusak sehingga VOC membutuhkan lahan baru di pulau-pulau lain.",
        },
        {
          correct: true,
          label:
            "Orang Banda tetap menjual pala kepada pedagang lain meski terikat perjanjian.",
        },
      ],
    },
  },
};

export default item;
