import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "solar-hall",
  versions: {
    en: {
      columns: [
        "The battery alone is enough",
        "The hall will need the grid",
        "Not allowed as planned",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Film night after a clear day, battery full: lights, projector and sound system for $$3$$ hours each.",
        },
        {
          column: 3,
          label:
            "Wedding after a clear day, battery full: lights and fans for $$5$$ hours, sound system for $$4$$ hours, and the water pump for one hour while the sound system plays.",
        },
        {
          column: 2,
          label:
            "Night market after an overcast day, $$12$$ kWh in the battery at sunset: lights and fans for $$6$$ hours.",
        },
        {
          column: 1,
          label:
            "Meeting after a clear day, battery full: lights and fans for $$5$$ hours, then the water pump for one hour after everything else is off.",
        },
        {
          column: 2,
          label:
            "Quiz night after an overcast day, $$10$$ kWh in the battery at sunset: lights, fans and sound system for $$4$$ hours each.",
        },
      ],
    },
  },
};

export default item;
