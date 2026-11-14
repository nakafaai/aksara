import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "debat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "naiknya persentase pidato yang langsung menanggapi argumen lawan dari $$40\\%$$ pada lomba tahun lalu menjadi $$65\\%$$ pada lomba tahun ini",
        },
        {
          correct: false,
          label:
            "naiknya jumlah pidato yang langsung menanggapi argumen lawan sebanyak $$25$$ pidato",
        },
        {
          correct: false,
          label:
            "naiknya persentase pidato yang langsung menanggapi argumen lawan sebesar $$65\\%$$",
        },
        {
          correct: false,
          label:
            "naiknya persentase pidato yang dibacakan dari naskah susunan pelatih menjadi $$65\\%$$",
        },
        {
          correct: false,
          label: "naiknya nilai rata-rata pembicara dari $$40$$ menjadi $$65$$",
        },
      ],
    },
  },
};

export default item;
