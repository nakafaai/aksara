import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "application",
  },
  stimulus: "pantun-tradition",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pohon kelapa tumbuh di pantai, / daunnya melambai ditiup angin. / Hati senang hidup pun santai, / bila bekerja dengan rajin.",
        },
        {
          correct: false,
          label:
            "Dengarlah anak sebuah pesan, / pilihlah teman dengan perlahan. / Jauhi kawan yang suka bohongan, / supaya hidup penuh ketenangan.",
        },
        {
          correct: false,
          label:
            "Belajarlah setiap hari, / jangan menunda sampai esok. / Ilmu dicari sepenuh hati, / masa depan tentu elok.",
        },
        {
          correct: true,
          label:
            "Ikan sepat di dalam kolam, / berenang-renang mencari makan. / Kalau berbuat salah semalam, / segeralah meminta dimaafkan.",
        },
        {
          correct: false,
          label:
            "Pergi ke kebun memetik jambu, / pulang membawa sekeranjang tebu. / Kalau ingin menjadi pandai, / belajarlah tanpa lalai.",
        },
      ],
    },
  },
};

export default item;
