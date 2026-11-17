import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The inverted copy cancels the hum whatever the delay, because it is an exact inverted copy",
        },
        {
          correct: true,
          label:
            "The delay is a fifth of a period, so the two waves differ in phase by $$108^\\circ$$ and the hum gets louder, about $$1.2$$ times its amplitude",
        },
        {
          correct: false,
          label:
            "The delay is a fifth of a period, so the hum drops to a fifth of its amplitude",
        },
        {
          correct: false,
          label:
            "The delay shifts the copy by $$72^\\circ$$, so the waves add to $$2\\cos 36^\\circ = 1.6$$ times the amplitude",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Salinan terbalik membatalkan dengung walau apa pun kelewatannya, kerana ia salinan terbalik yang tepat",
        },
        {
          correct: true,
          label:
            "Kelewatan ialah satu perlima tempoh, jadi dua gelombang berbeza fasa sebanyak $$108^\\circ$$ dan dengung menjadi lebih kuat, kira-kira $$1.2$$ kali amplitudnya",
        },
        {
          correct: false,
          label:
            "Kelewatan ialah satu perlima tempoh, jadi dengung berkurang kepada satu perlima amplitudnya",
        },
        {
          correct: false,
          label:
            "Kelewatan mengalihkan salinan sebanyak $$72^\\circ$$, jadi gelombang bertambah menjadi $$2\\cos 36^\\circ = 1.6$$ kali amplitud",
        },
      ],
    },
  },
};

export default item;
