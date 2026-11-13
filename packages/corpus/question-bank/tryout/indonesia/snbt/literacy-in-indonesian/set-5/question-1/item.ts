import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "wallace-line",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mamalia darat K dan L lebih berbeda daripada mamalia darat M dan N, sedangkan perbedaan tumbuhan K dan L cenderung lebih kecil daripada perbedaan mamalia daratnya.",
        },
        {
          correct: false,
          label:
            "Mamalia darat M dan N lebih berbeda daripada mamalia darat K dan L, karena selat yang jauh lebih lebar lebih sulit diseberangi hewan darat.",
        },
        {
          correct: false,
          label:
            "K dan L tidak memiliki satu jenis makhluk pun yang sama, sedangkan susunan makhluk di M dan N hampir tidak dapat dibedakan.",
        },
        {
          correct: false,
          label:
            "Perbedaan makhluk antara K dan L sama tajamnya bagi mamalia darat, burung, dan tumbuhan, karena semuanya terhalang oleh laut yang sama.",
        },
        {
          correct: false,
          label:
            "Mamalia darat K dan L lebih berbeda daripada mamalia darat M dan N, asalkan iklim K dan L juga jauh berbeda satu sama lain.",
        },
      ],
    },
  },
};

export default item;
