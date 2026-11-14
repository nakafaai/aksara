import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "refill-depot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "air depot isi ulang terbukti berbahaya bagi semua warga",
        },
        {
          correct: true,
          label:
            "pesan bahwa semua air depot berbahaya dinilai menyesatkan karena sebagian besar depot memenuhi syarat",
        },
        {
          correct: false,
          label: "kepala puskesmas menutup semua depot di kecamatan itu",
        },
        {
          correct: false,
          label: "warga di media sosial menyebarkan hasil uji yang akurat",
        },
        {
          correct: false,
          label: "warga dilarang membeli air dari depot isi ulang",
        },
      ],
    },
  },
};

export default item;
