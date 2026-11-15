import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "bat-echolocation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ngengat itu berada di sisi kanan dan makin dekat, dan panggilan kelelawar makin rapat karena setiap gema cepat usang selagi mangsa terus berbelok.",
        },
        {
          correct: false,
          label:
            "Ngengat itu berada di sisi kanan tetapi makin jauh, dan panggilan kelelawar makin jarang karena gemanya makin lemah.",
        },
        {
          correct: false,
          label:
            "Ngengat itu berada di sisi kiri dan makin dekat, dan panggilan kelelawar makin rapat karena setiap gema cepat usang selagi mangsa terus berbelok.",
        },
        {
          correct: false,
          label:
            "Ngengat itu berada di sisi kanan dan makin dekat, dan panggilan kelelawar makin keras agar ngengat tidak sempat mendengarnya.",
        },
        {
          correct: false,
          label:
            "Ngengat itu berada di sisi kanan, tetapi jaraknya tidak dapat diketahui, karena selang antara panggilan dan gema hanya menunjukkan arah.",
        },
      ],
    },
  },
};

export default item;
