import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "braille-signs",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "nomor jalur di terminal tidak pernah berubah",
        },
        {
          correct: false,
          label: "papan baru dipasang tanpa bertanya kepada calon penggunanya",
        },
        { correct: false, label: "peserta uji coba menolak papan braille" },
        {
          correct: true,
          label:
            "masukan peserta uji coba mengubah isi dan letak papan penunjuk",
        },
        {
          correct: false,
          label: "perbaikan terminal membuat semua papan harus dipindahkan",
        },
      ],
    },
  },
};

export default item;
