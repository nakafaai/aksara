import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$26\\%$$ zinc, and the brass is softer than copper because the zinc atoms are larger",
        },
        {
          correct: true,
          label:
            "$$26\\%$$ zinc and about three copper atoms for each zinc atom, and the brass is harder than copper because the zinc atoms disrupt the orderly layers of copper atoms",
        },
        {
          correct: false,
          label:
            "$$52\\%$$ zinc and about one copper atom for each zinc atom, and the brass is harder than copper because the zinc atoms disrupt the orderly layers of copper atoms",
        },
        {
          correct: false,
          label:
            "$$26\\%$$ zinc and about three copper atoms for each zinc atom, and the brass conducts electricity better than pure copper",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$26\\%$$ zink, dan loyang lebih lembut daripada kuprum kerana atom zink lebih besar",
        },
        {
          correct: true,
          label:
            "$$26\\%$$ zink dan kira-kira tiga atom kuprum bagi setiap atom zink, dan loyang lebih keras daripada kuprum kerana atom zink mengganggu susunan lapisan atom kuprum yang teratur",
        },
        {
          correct: false,
          label:
            "$$52\\%$$ zink dan kira-kira satu atom kuprum bagi setiap atom zink, dan loyang lebih keras daripada kuprum kerana atom zink mengganggu susunan lapisan atom kuprum yang teratur",
        },
        {
          correct: false,
          label:
            "$$26\\%$$ zink dan kira-kira tiga atom kuprum bagi setiap atom zink, dan loyang mengalirkan elektrik lebih baik daripada kuprum tulen",
        },
      ],
    },
  },
};

export default item;
