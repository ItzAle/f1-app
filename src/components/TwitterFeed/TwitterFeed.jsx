import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function TwitterFeed() {
  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="f1"
        options={{ height: "600px", width: "1000px" }}
      />
    </div>
  );
}

export default TwitterFeed;
