import React, {ReactElement} from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Box, ButtonBase, styled } from "@material-ui/core";

import { ImageShadow } from "../menu-components/menu.styles";
import { Food } from "menu-components/types";
import { NullFood } from '../menu-components/types';

export const LoaderWrapper = ({ Loader, loading, children }: {Loader: ReactElement, loading: boolean, children: ReactElement }) => {
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
}

export const FocusShadow = ({ active, setActive, children } : FocusProps) => {
  if (active) {
    return (
      <ImageShadow onClick={() => setActive(NullFood)}>
        <Box>
          <FontAwesomeIcon color="white" icon={faTimes} />
        </Box>
        {children}
      </ImageShadow>
    );
  }
  return <></>;
};

FocusShadow.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
