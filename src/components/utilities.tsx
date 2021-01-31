import React, { Children, Fragment, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@material-ui/core";

import { ImageShadow } from "../menu-components/menu.styles";
import { Food } from "menu-components/types";
import { NullFood } from "../menu-components/types";

export const LoaderWrapper = ({
  Loader,
  loading,
  children,
}: {
  Loader: ReactElement;
  loading: boolean;
  children: ReactElement;
}): ReactElement => {
  return <>{loading ? Loader : children}</>;
};

/*
const CloseBox = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;
`;
*/

type FocusProps = {
  active: boolean;
  setActive: (arg: Food) => void;
  children: ReactElement;
};

export const FocusShadow = ({ active, setActive, children }: FocusProps) => {
  if (active) {
    return (
      <ImageShadow
        onClick={() => {
          setActive(NullFood);
        }}
      >
        <Box style={{ position: "absolute", right: 0, margin: "20px" }}>
          <FontAwesomeIcon color="white" icon={faTimes} size="2x" />
        </Box>
        {children}
      </ImageShadow>
    );
  }
  return <></>;
};

export const StopPropagation = ({
  children,
}: {
  children: ReactElement[] | ReactElement;
}): ReactElement => (
  <Fragment>
    {Children.map(children, (child) => {
      React.cloneElement(child, {
        onClick: (e: MouseEvent) => {
          e.stopPropagation();
        },
      });
    })}
  </Fragment>
);
