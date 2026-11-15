import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Gonjong rumah gadang melengkung seperti tanduk kerbau, dan atapnya yang curam membuat air hujan cepat mengalir turun.",
        },
        {
          correct: false,
          label:
            "Dalam adat matrilineal, rumah gadang milik kaum, dan bilik-biliknya disediakan untuk anak perempuan yang sudah menikah.",
        },
        {
          correct: true,
          label:
            "Rumah gadang lentur saat gempa karena cara tiang dan sambungannya disusun, tetapi kelenturan itu menuntut perawatan dan cara berdiri yang asli.",
        },
        {
          correct: false,
          label:
            "Tiang rumah gadang diletakkan di atas batu sandi, dan sambungannya dikunci dengan pasak kayu, bukan paku.",
        },
        {
          correct: false,
          label:
            'Sebutan rumah gadang sebagai "rumah tahan gempa" perlu dibaca dengan hati-hati.',
        },
      ],
    },
  },
};

export default item;
