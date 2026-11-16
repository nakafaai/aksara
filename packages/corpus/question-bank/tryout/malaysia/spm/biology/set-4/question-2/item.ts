import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$7.9$$ times, because the cell absorbs water and mineral ions over the whole of its larger surface",
        },
        {
          correct: false,
          label:
            "About $$8.9$$ times, because the many chloroplasts in the hair make sugar to drive active transport",
        },
        {
          correct: false,
          label:
            "About $$16.7$$ times, because the cell absorbs water and mineral ions over the whole of its larger surface",
        },
        {
          correct: true,
          label:
            "About $$8.9$$ times, because the cell absorbs water and mineral ions over the whole of its larger surface",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kira-kira $$7.9$$ kali, kerana sel menyerap air dan ion mineral melalui seluruh permukaannya yang lebih besar",
        },
        {
          correct: false,
          label:
            "Kira-kira $$8.9$$ kali, kerana banyak kloroplas dalam rambut menghasilkan gula untuk memacu pengangkutan aktif",
        },
        {
          correct: false,
          label:
            "Kira-kira $$16.7$$ kali, kerana sel menyerap air dan ion mineral melalui seluruh permukaannya yang lebih besar",
        },
        {
          correct: true,
          label:
            "Kira-kira $$8.9$$ kali, kerana sel menyerap air dan ion mineral melalui seluruh permukaannya yang lebih besar",
        },
      ],
    },
  },
};

export default item;
