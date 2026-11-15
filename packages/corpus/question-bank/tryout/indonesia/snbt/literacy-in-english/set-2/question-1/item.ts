import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "cuckoo-eggs",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because deserting a nest loses a week or more of a short breeding season, which matters most where cuckoos are rare.",
        },
        {
          correct: true,
          label:
            "Because an odd egg there is usually its own, so a habit of rejecting would mostly destroy its own eggs.",
        },
        {
          correct: false,
          label:
            "Because cuckoo eggs match host eggs so closely that it could not pick out the cuckoo's egg anyway.",
        },
        {
          correct: false,
          label:
            "Because where cuckoos are rare, an accepted cuckoo egg no longer leads to the loss of the warbler's brood.",
        },
        {
          correct: false,
          label:
            "Because natural selection has removed the ability to recognise odd eggs from warblers that rarely meet cuckoos.",
        },
      ],
    },
  },
};

export default item;
