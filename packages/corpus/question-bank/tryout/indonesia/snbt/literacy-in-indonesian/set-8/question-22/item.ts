import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "bandung-conference",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Konferensi Asia Afrika diprakarsai oleh lima negara yang bersiap di Kolombo dan Bogor.",
        },
        {
          correct: false,
          label:
            "Konferensi Asia Afrika gagal total karena para pesertanya berbeda pandangan tentang Uni Soviet.",
        },
        {
          correct: false,
          label:
            "Gedung Konferensi Asia Afrika adalah warisan terpenting dari konferensi tersebut.",
        },
        {
          correct: false,
          label:
            "Konferensi Asia Afrika mungkin diadakan agar Indonesia memimpin Gerakan Non-Blok.",
        },
        {
          correct: true,
          label:
            "Konferensi Asia Afrika menyatukan negara baru di luar blok dan meninggalkan warisan gagasan.",
        },
      ],
    },
  },
};

export default item;
