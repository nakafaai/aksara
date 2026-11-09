import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "bandung-conference",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Konferensi Asia Afrika diikuti oleh wakil dari 29 negara Eropa.",
        },
        {
          column: 1,
          label:
            "Persiapan konferensi dibahas dalam pertemuan di Kolombo dan Bogor.",
        },
        {
          column: 2,
          label:
            "Gerakan Non-Blok lahir dalam Konferensi Asia Afrika pada 1955.",
        },
        {
          column: 1,
          label:
            "Dasasila Bandung menekankan penyelesaian sengketa secara damai.",
        },
      ],
    },
  },
};

export default item;
