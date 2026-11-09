import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "refill-depot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "*Stiker* berarti surat izin usaha yang dikirim ke rumah pemilik depot.",
        },
        {
          correct: true,
          label:
            "*Bakteri* berarti makhluk hidup sangat kecil yang dapat menyebabkan penyakit.",
        },
        {
          correct: true,
          label:
            "*Galon* berarti wadah besar tempat air minum dibawa pulang oleh pembeli.",
        },
        {
          correct: false,
          label:
            "*Ultraviolet* berarti air yang sudah disaring berlapis-lapis.",
        },
      ],
    },
  },
};

export default item;
