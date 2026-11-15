import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ngengat yang organ bunyinya dilumpuhkan lebih sering tertangkap daripada ngengat yang organ bunyinya utuh.",
        },
        {
          correct: false,
          label:
            "Pengaruh klik tidak memudar walaupun kelelawar sudah berkali-kali mendengarnya dalam serangan sebelumnya.",
        },
        {
          correct: true,
          label:
            "Kelelawar yang belum pernah memakan ngengat itu sudah meleset sejak serangan pertamanya terhadap ngengat bersuara.",
        },
        {
          correct: false,
          label:
            "Ngengat utuh mulai berbunyi ketika kelelawar masih jauh dan panggilan kelelawar itu masih jarang.",
        },
        {
          correct: false,
          label:
            "Kelelawar yang meleset dari ngengat bersuara tetap tepat menangkap ngengat bisu pada malam yang sama.",
        },
      ],
    },
  },
};

export default item;
