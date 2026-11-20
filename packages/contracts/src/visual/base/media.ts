import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The identifier of one YouTube video: letters, digits, `-`, and `_`. */
const VideoIdSchema = Schema.String.check(Schema.isPattern(/^[\w-]+$/u));

/**
 * Props of `Mermaid`: a diagram source with the title and description of its
 * card. The renderer owns the Mermaid settings and names the drawing by its
 * title.
 */
function mermaid<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chart: Schema.String.check(Schema.isNonEmpty()),
    })
  );
}

/** Props of `Youtube`: one embedded video. */
const YoutubeSchema = Schema.Struct({ videoId: VideoIdSchema });

/** The media components: a diagram from its source and an embedded video. */
export function mediaVisuals<E>(rich: RichSlot<E>) {
  return {
    Mermaid: mermaid(rich),
    Youtube: figure(YoutubeSchema),
  };
}
