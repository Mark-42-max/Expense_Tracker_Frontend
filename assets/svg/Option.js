/* eslint-disable prettier/prettier */
/* eslint-disable quotes */

import * as React from "react";
import Svg, { Circle, G, Path, Defs, ClipPath } from "react-native-svg";

const Option = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="#fff"
    {...props}
  >
    <Circle opacity={0.24} cx={16} cy={16} r={15.5} stroke="#1E2121" />
    <G clipPath="url(#a)">
      <Path
        d="M11 14.334c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666.916 0 1.666-.75 1.666-1.666 0-.917-.75-1.667-1.666-1.667Zm10 0c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666.916 0 1.666-.75 1.666-1.666 0-.917-.75-1.667-1.666-1.667Zm-5 0c-.917 0-1.667.75-1.667 1.667 0 .916.75 1.666 1.667 1.666.916 0 1.666-.75 1.666-1.666 0-.917-.75-1.667-1.666-1.667Z"
        fill="#1E2121"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(6 6)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Option;
