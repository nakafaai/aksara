import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "campus-commute",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bus users form the largest group, and a station shuttle would solve their timetable problems.",
        },
        {
          correct: true,
          label:
            "Train users have the longest trips and a high lateness rate, and they blame the walk from the station, which a shuttle would replace.",
        },
        {
          correct: false,
          label:
            "Students who walk have the lowest lateness rate of all the groups.",
        },
        {
          correct: false,
          label:
            "Students who travel by car or motorbike spend 26 minutes on an average trip.",
        },
        {
          correct: false,
          label:
            "Forty percent of students who do not cycle would consider cycling if secure parking were available.",
        },
      ],
    },
  },
};

export default item;
