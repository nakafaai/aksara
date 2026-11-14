import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "pusaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Harta pusaka tinggi, seperti sawah, ladang, dan rumah gadang, diwariskan melalui garis perempuan sehingga menjadi milik anak perempuan yang menerimanya dan tidak boleh dijual sesuka hati.",
        },
        {
          correct: false,
          label:
            "Harta pusaka tinggi, seperti sawah, ladang, dan rumah gadang, diturunkan dari ibu kepada anak perempuannya, tetapi tetap dimiliki bersama oleh kaum sehingga tidak boleh dijual sama sekali.",
        },
        {
          correct: false,
          label:
            "Walaupun dimiliki bersama oleh kaum, harta pusaka tinggi seperti sawah, ladang, dan rumah gadang boleh dijual oleh anak perempuan yang mewarisinya.",
        },
        {
          correct: false,
          label:
            "Semua harta keluarga Minangkabau, seperti sawah, ladang, dan rumah gadang, diturunkan dari ibu kepada anak perempuannya sebagai milik bersama kaum yang tidak boleh dijual sesuka hati.",
        },
        {
          correct: true,
          label:
            "Walaupun diturunkan dari ibu kepada anak perempuannya, harta pusaka tinggi seperti sawah, ladang, dan rumah gadang tetap merupakan milik bersama kaum yang tidak dapat dijual semaunya.",
        },
      ],
    },
  },
};

export default item;
