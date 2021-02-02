import React, { Children, Fragment, ReactElement } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Box } from "@material-ui/core";

// import { Food } from "menu/types";
// import { NullFood } from "../menu/types";

export const LoaderWrapper = ({
  Loader,
  loading,
  children,
}: {
  Loader: ReactElement;
  loading: boolean;
  children: ReactElement | ReactElement[];
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
