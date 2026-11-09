import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "kunang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "jantan dan betina jadi sulit saling menemukan pada malam hari",
        },
        {
          correct: false,
          label:
            "cahaya lampu membuat larva kunang-kunang kepanasan di dalam tanah",
        },
        {
          correct: false,
          label: "kunang-kunang memakan serangga lain yang tertarik ke lampu",
        },
        {
          correct: false,
          label:
            "lampu buatan menghabiskan oksigen yang dibutuhkan kunang-kunang",
        },
        {
          correct: false,
          label: "cahaya lampu mengubah kunang-kunang menjadi sejenis lalat",
        },
      ],
    },
  },
};

export default item;
