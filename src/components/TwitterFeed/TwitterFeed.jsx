import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function TwitterFeed() {
  return (
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="f1"
        options={{ height: "1000px", width: "1000px" }}
      />
  );
}

export default TwitterFeed;
