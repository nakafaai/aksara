import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Simulasi membandingkan kemampuan lapisan gabus setebal dua sentimeter dalam meredam bunyi pada kotak model, sambil mengendalikan faktor lain dan mengakui keterbatasan pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan kemampuan lapisan gabus setebal dua sentimeter dalam meredam bunyi pada kotak model, sambil mengendalikan faktor yang disebutkan tetapi menjadikan satu uji singkat sebagai bukti yang berlaku umum.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan kemampuan lapisan gabus setebal dua sentimeter dalam meredam bunyi pada kotak model, sambil menyebut keterbatasan tetapi mengeluarkan kondisi pembanding dari penafsiran hasil.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan kemampuan lapisan gabus setebal dua sentimeter dalam meredam bunyi pada kotak model, sambil menjadikan definisi istilah ilmiah sebagai hasil ukur yang menutup penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi membandingkan kemampuan lapisan gabus setebal dua sentimeter dalam meredam bunyi pada kotak model, sambil memakai pembanding hanya untuk mengukuhkan hipotesis awal dan menghapus ketidakpastian yang tersisa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
