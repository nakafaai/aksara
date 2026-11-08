import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "plastic-free-market",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua pedagang di Pasar Pagi Sukamaju menolak larangan kantong plastik.",
        },
        {
          correct: false,
          label:
            "Pembeli wajib membeli tas kain setiap kali berbelanja di pasar itu.",
        },
        {
          correct: false,
          label:
            "Larangan kantong plastik membuat pembeli berpenghasilan rendah berhenti berbelanja di pasar itu.",
        },
        {
          correct: false,
          label:
            "Pengelola pasar lain sudah meniru kebijakan Pasar Pagi Sukamaju.",
        },
        {
          correct: true,
          label:
            "Kekhawatiran pedagang sayur tentang berkurangnya pembeli tidak terjadi di Pasar Pagi Sukamaju.",
        },
      ],
    },
  },
};

export default item;
