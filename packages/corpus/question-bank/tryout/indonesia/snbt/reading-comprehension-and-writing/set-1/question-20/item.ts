import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "waste-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bank sampah itu hanya menerima botol plastik dan kardus.",
        },
        {
          correct: false,
          label: "Nasabah mendapat uang tunai setiap kali menyetor sampah.",
        },
        {
          correct: false,
          label:
            "Kertas campur adalah jenis sampah yang paling banyak diterima pada bulan Agustus.",
        },
        {
          correct: true,
          label:
            "Nasabah yang menyetor 1 kilogram botol plastik bening dan nasabah yang menyetor 1 kilogram kardus memperoleh nilai tabungan yang berbeda.",
        },
        {
          correct: false,
          label: "Harga beli semua jenis sampah naik pada bulan September.",
        },
      ],
    },
  },
};

export default item;
