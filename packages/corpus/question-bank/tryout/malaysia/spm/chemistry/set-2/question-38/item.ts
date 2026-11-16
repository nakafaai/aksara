import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5\\%$$, and the rubber springs back to its shape because the cross-links stop the chains sliding past one another",
        },
        {
          correct: true,
          label:
            "$$10\\%$$, and the rubber springs back to its shape because the cross-links stop the chains sliding past one another",
        },
        {
          correct: false,
          label:
            "$$20\\%$$, and the rubber springs back to its shape because the cross-links stop the chains sliding past one another",
        },
        {
          correct: false,
          label:
            "$$10\\%$$, and the rubber becomes softer because the cross-links use up its double bonds",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5\\%$$, dan getah itu kembali kepada bentuk asalnya kerana rangkai silang menghalang rantai daripada menggelongsor melepasi satu sama lain",
        },
        {
          correct: true,
          label:
            "$$10\\%$$, dan getah itu kembali kepada bentuk asalnya kerana rangkai silang menghalang rantai daripada menggelongsor melepasi satu sama lain",
        },
        {
          correct: false,
          label:
            "$$20\\%$$, dan getah itu kembali kepada bentuk asalnya kerana rangkai silang menghalang rantai daripada menggelongsor melepasi satu sama lain",
        },
        {
          correct: false,
          label:
            "$$10\\%$$, dan getah itu menjadi lebih lembut kerana rangkai silang menggunakan ikatan ganda duanya",
        },
      ],
    },
  },
};

export default item;
